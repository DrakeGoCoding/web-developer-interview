import { IHighlightItem } from '@/models';

type HighlightItem = { text: string; highlight: boolean };

/**
 * Splits a given text into an array of objects, each containing a snippet of
 * text and a boolean indicating whether that snippet should be highlighted.
 * @param {string} text - The text to be split.
 * @param {string} keyword - The keyword to be highlighted.
 * @returns {HighlightItem[]} An array of text snippets with highlight information.
 */
export const categorizeByHighlight = (
  text: string,
  keyword: string
): HighlightItem[] => {
  const result: HighlightItem[] = [];
  let currentIndex = 0;

  // Return an empty result if the input text is empty
  if (!text.length) {
    return result;
  }

  // If keyword is empty or not found in text, return the whole text as non-highlighted
  if (!keyword.length || !text.includes(keyword)) {
    result.push({ text, highlight: false });
    return result;
  }

  // Iterate through the text to find occurrences of the keyword
  while (currentIndex < text.length) {
    const matchIndex = text.indexOf(keyword, currentIndex);

    // If no more matches are found, add the remaining text as non-highlighted
    if (matchIndex === -1) {
      if (currentIndex < text.length) {
        result.push({
          text: text.slice(currentIndex),
          highlight: false,
        });
      }
      break;
    }

    // Add the text before the keyword as non-highlighted
    if (currentIndex < matchIndex) {
      result.push({
        text: text.slice(currentIndex, matchIndex),
        highlight: false,
      });
    }

    // Add the keyword itself as highlighted
    result.push({
      text: text.slice(matchIndex, matchIndex + keyword.length),
      highlight: true,
    });

    // Move the current index past the keyword
    currentIndex = matchIndex + keyword.length;
  }

  return result;
};

/**
 * Splits a given text into an array of objects, each containing a snippet of
 * text and a boolean indicating whether that snippet should be highlighted,
 * based on the given highlight offsets.
 * @param {string} text - The text to be split.
 * @param {IHighlightItem[]} highlights - An array of objects containing the
 *   offsets of the text to be highlighted.
 * @returns {HighlightItem[]} An array of text snippets with highlight information.
 */
export const categorizeHighlightInDocument = (
  text: string,
  highlights: IHighlightItem[]
): HighlightItem[] => {
  const result: HighlightItem[] = [];
  let currentIndex = 0;

  // Return an empty result if the input text is empty
  if (!text.length) {
    return result;
  }

  if (!highlights?.length) {
    // If there are no highlights, return the whole text as non-highlighted
    result.push({ text, highlight: false });
    return result;
  }

  highlights.forEach(({ BeginOffset, EndOffset }) => {
    if (currentIndex < BeginOffset) {
      // Add the text before the highlight as non-highlighted
      result.push({
        text: text.slice(currentIndex, BeginOffset),
        highlight: false,
      });
    }

    // Add the highlighted text
    result.push({
      text: text.slice(BeginOffset, EndOffset),
      highlight: true,
    });

    // Move the current index past the highlight
    currentIndex = EndOffset;
  });

  if (currentIndex < text.length) {
    // Add the text after the last highlight as non-highlighted
    result.push({
      text: text.slice(currentIndex),
      highlight: false,
    });
  }

  return result;
};
