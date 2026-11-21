import React from 'react';
import { Trash2, Sparkles } from 'lucide-react';
import { TrademarkStage, MarkType, FilingBasis, CaseTemplateData } from './types.js';
import { CASE_PRESETS } from './sampleData.js';

interface CaseTemplateFormProps {
  data: CaseTemplateData;
  onChange: (updated: CaseTemplateData) => void;
  onApplyPreset: (presetData: CaseTemplateData) => void;
  onClear: () => void;
}

const STAGES: TrademarkStage[] = [
  'Clearance & Search',
  'Pending Examination',
  'Office Action (Response Due)',
  'Published for Opposition',
  'Notice of Allowance (SOU Due)',
  'Registered (Active Maintenance)'
];

const MARK_TYPES: MarkType[] = [
  'Standard Character (Word Mark)',
  'Special Form (Stylized Logo)',
  'Sound / Non-Traditional Mark'
];

const BASES: FilingBasis[] = [
  'Section 1(b) Intent-to-Use',
  'Section 1(a) Use in Commerce',
  'Section 44(d) Foreign Priority',
  'Section 44(e) Foreign Registration',
  'Section 66(a) Madrid Protocol'
];

export const CaseTemplateForm: React.FC<CaseTemplateFormProps> = ({
  data,
  onChange,
  onApplyPreset,
  onClear
}) => {
  const updateField = <K extends keyof CaseTemplateData>(key: K, value: CaseTemplateData[K]) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div
      className="notion-card"
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.125rem',
        backgroundColor: 'var(--bg-surface)'
      }}
    >
      {/* Form Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          Trademark Matter Information (USPTO)
        </h3>
        <button
          type="button"
          onClick={onClear}
          className="btn"
          title="Clear all fields"
          style={{
            padding: '0.25rem 0.5rem',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-subtle)',
            color: 'var(--text-secondary)',
            fontSize: '0.75rem',
            cursor: 'pointer'
          }}
        >
          <Trash2 size={13} style={{ marginRight: '0.25rem' }} />
          Clear
        </button>
      </div>

      {/* Preset Chips */}
      <div>
        <span style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.35rem' }}>
          Load Preconfigured Presets
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {CASE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApplyPreset(preset.data)}
              className="badge"
              style={{
                cursor: 'pointer',
                backgroundColor: 'var(--bg-page)',
                borderColor: 'var(--border)',
                color: 'var(--text-secondary)',
                fontSize: '0.6875rem',
                padding: '0.2rem 0.5rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
              title={preset.description}
            >
              <Sparkles size={11} style={{ color: 'var(--accent)' }} />
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section 1: Matter Stage & Mark Name */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
            Matter Stage
          </label>
          <select
            value={data.stage}
            onChange={(e) => updateField('stage', e.target.value as TrademarkStage)}
            className="input-field"
            style={{ width: '100%', padding: '0.4rem 0.6rem', fontSize: '0.8125rem' }}
          >
            {STAGES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
            Mark Name
          </label>
          <input
            type="text"
            value={data.markName}
            onChange={(e) => updateField('markName', e.target.value)}
            placeholder="e.g. NEXUS CLOUD"
            className="input-field"
            style={{ width: '100%', padding: '0.4rem 0.6rem', fontSize: '0.8125rem' }}
          >
          </input>
        </div>
      </div>

      {/* Section 2: Mark Type & Filing Basis */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
            Mark Type
          </label>
          <select
            value={data.markType}
            onChange={(e) => updateField('markType', e.target.value as MarkType)}
            className="input-field"
            style={{ width: '100%', padding: '0.4rem 0.6rem', fontSize: '0.8125rem' }}
          >
            {MARK_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
            Filing Basis
          </label>
          <select
            value={data.filingBasis}
            onChange={(e) => updateField('filingBasis', e.target.value as FilingBasis)}
            className="input-field"
            style={{ width: '100%', padding: '0.4rem 0.6rem', fontSize: '0.8125rem' }}
          >
            {BASES.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Section 3: Applicant Entity & Classes */}
      <div>
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
          Applicant (Legal Owner & Domicile)
        </label>
        <input
          type="text"
          value={data.applicant}
          onChange={(e) => updateField('applicant', e.target.value)}
          placeholder="e.g. Apex Technologies Inc. (Delaware C-Corp)"
          className="input-field"
          style={{ width: '100%', padding: '0.4rem 0.6rem', fontSize: '0.8125rem' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
          Nice Classification & Goods/Services Scope
        </label>
        <input
          type="text"
          value={data.classes}
          onChange={(e) => updateField('classes', e.target.value)}
          placeholder="e.g. Class 009 (Downloadable Software), Class 042 (Cloud SaaS Platform)"
          className="input-field"
          style={{ width: '100%', padding: '0.4rem 0.6rem', fontSize: '0.8125rem' }}
        />
      </div>

      {/* Section 4: Serial Number, Reg Number & Deadline */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
            USPTO Serial Number
          </label>
          <input
            type="text"
            value={data.serialNumber}
            onChange={(e) => updateField('serialNumber', e.target.value)}
            placeholder="e.g. 98/821,432 (Filed: 01/20/2026)"
            className="input-field"
            style={{ width: '100%', padding: '0.4rem 0.6rem', fontSize: '0.8125rem' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
            Registration # (if granted)
          </label>
          <input
            type="text"
            value={data.registrationNumber || ''}
            onChange={(e) => updateField('registrationNumber', e.target.value)}
            placeholder="e.g. Reg. # 7,123,456"
            className="input-field"
            style={{ width: '100%', padding: '0.4rem 0.6rem', fontSize: '0.8125rem' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
            Next Statutory Deadline
          </label>
          <input
            type="text"
            value={data.statutoryDeadline || ''}
            onChange={(e) => updateField('statutoryDeadline', e.target.value)}
            placeholder="e.g. Office Action Due: 06/15/2026"
            className="input-field"
            style={{ width: '100%', padding: '0.4rem 0.6rem', fontSize: '0.8125rem' }}
          />
        </div>
      </div>

      {/* Section 5: Specimen Status & Docket Notes */}
      <div>
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
          Specimen Status & Docketing Notes
        </label>
        <textarea
          rows={3}
          value={data.notes}
          onChange={(e) => updateField('notes', e.target.value)}
          placeholder="e.g. Commercial checkout specimen verified; Disclaimer of descriptive term agreed."
          className="input-field"
          style={{ width: '100%', padding: '0.5rem', fontSize: '0.8125rem', resize: 'vertical' }}
        />
      </div>
    </div>
  );
};
