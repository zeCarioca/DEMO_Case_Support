import React, { useState, useEffect } from 'react';
import { CaseTemplateData, SavedDraft } from './types.js';
import { DEFAULT_SAMPLE_CASE, EMPTY_CASE } from './sampleData.js';
import { generateCaseDescription } from './generatorLogic.js';
import {
  loadDraftHistory,
  saveDraftToHistory,
  deleteDraftFromHistory,
  clearDraftHistory,
  saveActiveDraft,
  loadActiveDraft,
  clearActiveDraft
} from './historyStorage.js';
import { CaseTemplateForm } from './CaseTemplateForm.js';
import { CaseTemplateEditor } from './CaseTemplateEditor.js';

export const InteractiveGeneratorTab: React.FC = () => {
  // Crash recovery initialization: check if an active draft exists in storage
  const [formData, setFormData] = useState<CaseTemplateData>(() => {
    const active = loadActiveDraft();
    return active?.data || DEFAULT_SAMPLE_CASE;
  });

  const [editorText, setEditorText] = useState<string>(() => {
    const active = loadActiveDraft();
    return active?.formattedText || generateCaseDescription(DEFAULT_SAMPLE_CASE);
  });

  const [isManualOverride, setIsManualOverride] = useState<boolean>(() => {
    const active = loadActiveDraft();
    return active?.isManualOverride ?? false;
  });

  const [draftHistory, setDraftHistory] = useState<SavedDraft[]>(() => loadDraftHistory());

  // Save current valid draft to revision history (debounce 1200ms)
  useEffect(() => {
    if (!editorText.trim()) return;
    const timer = setTimeout(() => {
      const updated = saveDraftToHistory(formData, editorText);
      setDraftHistory(updated);
      saveActiveDraft(formData, editorText, isManualOverride);
    }, 1200);
    return () => clearTimeout(timer);
  }, [formData, editorText, isManualOverride]);

  const handleFormChange = (updated: CaseTemplateData) => {
    setFormData(updated);
    if (!isManualOverride) {
      setEditorText(generateCaseDescription(updated));
    }
  };

  const handleApplyPreset = (presetData: CaseTemplateData) => {
    setFormData(presetData);
    setIsManualOverride(false);
    setEditorText(generateCaseDescription(presetData));
  };

  const handleEditorChange = (newText: string) => {
    setIsManualOverride(true);
    setEditorText(newText);
  };

  const handleResync = () => {
    setIsManualOverride(false);
    setEditorText(generateCaseDescription(formData));
  };

  const handleClear = () => {
    setFormData(EMPTY_CASE);
    setIsManualOverride(false);
    setEditorText(generateCaseDescription(EMPTY_CASE));
    clearActiveDraft();
  };

  const handleRestoreDraft = (draft: SavedDraft) => {
    setFormData(draft.data);
    setEditorText(draft.formattedText);
    setIsManualOverride(true);
  };

  const handleDeleteDraft = (id: string) => {
    const updated = deleteDraftFromHistory(id);
    setDraftHistory(updated);
  };

  const handleClearHistory = () => {
    clearDraftHistory();
    setDraftHistory([]);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '1.5rem',
        alignItems: 'start'
      }}
    >
      {/* Left Column: Input Form with Quick Presets */}
      <CaseTemplateForm
        data={formData}
        onChange={handleFormChange}
        onApplyPreset={handleApplyPreset}
        onClear={handleClear}
      />

      {/* Right Column: Interactive & Editable Output */}
      <CaseTemplateEditor
        value={editorText}
        onChange={handleEditorChange}
        isManualOverride={isManualOverride}
        onResync={handleResync}
        draftHistory={draftHistory}
        onRestoreDraft={handleRestoreDraft}
        onDeleteDraft={handleDeleteDraft}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
};
