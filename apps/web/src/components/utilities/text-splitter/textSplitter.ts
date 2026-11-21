export interface SplitOptions {
  maxChars?: number;
  hyphenateBreak?: boolean;
  preserveParagraphs?: boolean;
}

export interface SplitBoxItem {
  index: number;
  text: string;
  charCount: number;
  isHyphenated: boolean;
}

export const DEFAULT_MAX_CHARS = 41;

export const SAMPLE_TEXT =
  '• Bachelor’s degree in Computer Science or a related engineering field\n• Two years of progressive experience in full-stack software development\n• Hands-on proficiency with REST APIs, cloud deployment, and relational databases\n• Must have valid authorized work status in the United States.';

/**
 * Cleans the input text by:
 * 1. Removing bullet points ('•' and unicode variants)
 * 2. Replacing line breaks (\r?\n) with a space (' ')
 * 3. Normalizing multiple consecutive spaces
 */
export function cleanInputText(text: string): string {
  if (!text) return '';
  return text
    .replace(/[•\u2022\u25CF\u25CB\u25AA\u25AB]/g, '')
    .replace(/\r?\n|\r/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Splits text into individual chunks/boxes of at most maxChars (default 41) characters,
 * breaking words that cross the boundary using a hyphen '-'.
 */
export function splitTextIntoBoxes(
  text: string,
  options: SplitOptions = {}
): SplitBoxItem[] {
  const maxChars = options.maxChars ?? DEFAULT_MAX_CHARS;
  const hyphenateBreak = options.hyphenateBreak ?? true;
  const preserveParagraphs = options.preserveParagraphs ?? true;

  if (!text || !text.trim()) {
    return [];
  }

  const rawSections = preserveParagraphs
    ? text.split(/\r?\n/)
    : [text.replace(/\r?\n/g, ' ')];

  const boxes: SplitBoxItem[] = [];

  for (let sIdx = 0; sIdx < rawSections.length; sIdx++) {
    const section = rawSections[sIdx];
    if (!section.trim()) {
      continue;
    }

    const words = section.trim().split(/\s+/);
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      let word = words[i];

      while (word.length > 0) {
        if (!currentLine) {
          if (word.length <= maxChars) {
            currentLine = word;
            word = '';
          } else {
            // Long single word exceeds max limit: must break with hyphen
            const takeChars = maxChars - 1;
            const chunk = word.slice(0, takeChars) + '-';
            boxes.push({
              index: boxes.length + 1,
              text: chunk,
              charCount: chunk.length,
              isHyphenated: true
            });
            word = word.slice(takeChars);
          }
        } else {
          const spaceNeeded = 1 + word.length;
          if (currentLine.length + spaceNeeded <= maxChars) {
            currentLine += ' ' + word;
            word = '';
          } else {
            if (hyphenateBreak) {
              const remaining = maxChars - currentLine.length;
              // Need at least 1 char for space, 1 letter, and 1 hyphen
              if (remaining >= 3 && word.length > 2) {
                const lettersToTake = remaining - 2;
                const wordPart = word.slice(0, lettersToTake) + '-';
                currentLine += ' ' + wordPart;
                boxes.push({
                  index: boxes.length + 1,
                  text: currentLine,
                  charCount: currentLine.length,
                  isHyphenated: true
                });
                currentLine = '';
                word = word.slice(lettersToTake);
              } else {
                boxes.push({
                  index: boxes.length + 1,
                  text: currentLine,
                  charCount: currentLine.length,
                  isHyphenated: currentLine.endsWith('-')
                });
                currentLine = '';
              }
            } else {
              boxes.push({
                index: boxes.length + 1,
                text: currentLine,
                charCount: currentLine.length,
                isHyphenated: currentLine.endsWith('-')
              });
              currentLine = '';
            }
          }
        }
      }
    }

    if (currentLine) {
      boxes.push({
        index: boxes.length + 1,
        text: currentLine,
        charCount: currentLine.length,
        isHyphenated: currentLine.endsWith('-')
      });
      currentLine = '';
    }
  }

  return boxes.map((b, idx) => ({ ...b, index: idx + 1 }));
}
