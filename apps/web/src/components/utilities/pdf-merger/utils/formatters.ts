/**
 * Formats a raw byte count into a human-readable file size (B, KB, MB, GB).
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Sanitizes and ensures a string ends with `.pdf`.
 */
export function sanitizePdfFilename(name: string, defaultName = 'merged-document.pdf'): string {
  const trimmed = name.trim().replace(/[/\\?%*:|"<>]/g, '_');
  if (!trimmed) return defaultName;
  if (!trimmed.toLowerCase().endsWith('.pdf')) {
    return `${trimmed}.pdf`;
  }
  return trimmed;
}

/**
 * Generates an exhibit letter based on 0-based index:
 * 0 -> A, 1 -> B, ..., 25 -> Z, 26 -> AA, 27 -> AB...
 */
export function getExhibitLetter(index: number): string {
  if (index < 0) return 'A';
  let letter = '';
  let temp = index;
  while (temp >= 0) {
    letter = String.fromCharCode((temp % 26) + 65) + letter;
    temp = Math.floor(temp / 26) - 1;
  }
  return letter;
}

/**
 * Formats a numeric timestamp into a concise time string.
 */
export function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

