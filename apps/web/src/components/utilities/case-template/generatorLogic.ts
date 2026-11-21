import { CaseTemplateData } from './types.js';

/**
 * Generates the standardized USPTO trademark matter description note.
 *
 * Rule: If a field is null/empty, its line/label is completely omitted.
 * Grouped sections are omitted entirely if all sub-fields are empty.
 */
export function generateCaseDescription(data: CaseTemplateData): string {
  const blocks: string[] = [];

  // 1. Stage, Mark Name, Type, Filing Basis & Applicant
  const headerLines: string[] = [];
  if (data.stage && data.stage.trim()) {
    headerLines.push(`[TRADEMARK MATTER STAGE]: ${data.stage.trim()}`);
  }
  if (data.markName && data.markName.trim()) {
    headerLines.push(`MARK NAME: "${data.markName.trim()}"`);
  }
  if (data.markType && data.markType.trim()) {
    headerLines.push(`MARK TYPE: ${data.markType.trim()}`);
  }
  if (data.filingBasis && data.filingBasis.trim()) {
    headerLines.push(`FILING BASIS: ${data.filingBasis.trim()}`);
  }
  if (data.applicant && data.applicant.trim()) {
    headerLines.push(`APPLICANT (OWNER): ${data.applicant.trim()}`);
  }
  if (headerLines.length > 0) {
    blocks.push(headerLines.join('\n'));
  }

  // 2. Nice Classification & Scope
  if (data.classes && data.classes.trim()) {
    blocks.push(`NICE CLASSIFICATION & SCOPE:\n• ${data.classes.trim()}`);
  }

  // 3. USPTO Docketing Identifiers & Deadlines
  const docketLines: string[] = [];
  if (data.serialNumber && data.serialNumber.trim()) {
    docketLines.push(`• Serial Number: ${data.serialNumber.trim()}`);
  }
  if (data.registrationNumber && data.registrationNumber.trim()) {
    docketLines.push(`• Registration Number: ${data.registrationNumber.trim()}`);
  }
  if (data.statutoryDeadline && data.statutoryDeadline.trim()) {
    docketLines.push(`• Statutory Deadline: ${data.statutoryDeadline.trim()}`);
  }
  if (docketLines.length > 0) {
    blocks.push(`USPTO DOCKETING IDENTIFIERS & DEADLINES:\n${docketLines.join('\n')}`);
  }

  // 4. Specimen Status & Docket Notes
  if (data.notes && data.notes.trim()) {
    blocks.push(`SPECIMEN STATUS & DOCKET NOTES:\n• ${data.notes.trim()}`);
  }

  return blocks.join('\n\n');
}
