import { CaseTemplateData, SavedDraft } from './types.js';

const HISTORY_KEY = 'case_template_recent_drafts_v1';
const AUTO_SAVE_KEY = 'case_template_active_autosave_v1';
export const MAX_DRAFTS = 100;

export interface AutoSavedState {
  data: CaseTemplateData;
  formattedText: string;
  isManualOverride: boolean;
  timestamp: number;
}

export function loadDraftHistory(): SavedDraft[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveDraftToHistory(
  data: CaseTemplateData,
  formattedText: string
): SavedDraft[] {
  if (!formattedText.trim()) return loadDraftHistory();

  try {
    const current = loadDraftHistory();
    const mark = data.markName?.trim() || 'Untitled Mark';
    const label = `${mark} (${data.stage || 'Docket Note'})`;

    const newDraft: SavedDraft = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      label,
      data: { ...data },
      formattedText
    };

    // Filter out duplicate identical content if saved recently
    const filtered = current.filter(
      (d) => d.formattedText.trim() !== formattedText.trim()
    );

    const updated = [newDraft, ...filtered].slice(0, MAX_DRAFTS);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.warn('Draft history save failed:', err);
    return loadDraftHistory();
  }
}

export function deleteDraftFromHistory(id: string): SavedDraft[] {
  try {
    const current = loadDraftHistory();
    const updated = current.filter((d) => d.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function clearDraftHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    // Ignore storage errors
  }
}

// Auto-save active work for crash and reload recovery
export function saveActiveDraft(
  data: CaseTemplateData,
  formattedText: string,
  isManualOverride: boolean
): void {
  if (!formattedText.trim()) return;
  try {
    const state: AutoSavedState = {
      data,
      formattedText,
      isManualOverride,
      timestamp: Date.now()
    };
    localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(state));
  } catch {
    // Ignore quota errors
  }
}

export function loadActiveDraft(): AutoSavedState | null {
  try {
    const raw = localStorage.getItem(AUTO_SAVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearActiveDraft(): void {
  try {
    localStorage.removeItem(AUTO_SAVE_KEY);
  } catch {
    // Ignore errors
  }
}
