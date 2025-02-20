import { describe, expect, it } from 'vitest';

import { categorizeByHighlight } from './highlight';

describe('categorizeByHighlight', () => {
  it('should return an empty array for empty text', () => {
    const result = categorizeByHighlight('', 'keyword');
    expect(result).toEqual([]);
  });

  it('should return the entire text with highlight=false when no keyword is found', () => {
    const result = categorizeByHighlight('hello world', 'foo');
    expect(result).toEqual([{ text: 'hello world', highlight: false }]);
  });

  it('should highlight the keyword when found once', () => {
    const result = categorizeByHighlight('hello world', 'world');
    expect(result).toEqual([
      { text: 'hello ', highlight: false },
      { text: 'world', highlight: true },
    ]);
  });

  it('should highlight multiple occurrences of the keyword', () => {
    const result = categorizeByHighlight('hello world world', 'world');
    expect(result).toEqual([
      { text: 'hello ', highlight: false },
      { text: 'world', highlight: true },
      { text: ' ', highlight: false },
      { text: 'world', highlight: true },
    ]);
  });

  it('should return the entire text with highlight=false when the keyword is an empty string', () => {
    const result = categorizeByHighlight('hello world', '');
    expect(result).toEqual([{ text: 'hello world', highlight: false }]);
  });

  it('should return the single character with highlight=false when the text is a single character', () => {
    const result = categorizeByHighlight('a', 'b');
    expect(result).toEqual([{ text: 'a', highlight: false }]);
  });

  it('should highlight the single character keyword when found', () => {
    const result = categorizeByHighlight('a', 'a');
    expect(result).toEqual([{ text: 'a', highlight: true }]);
  });
});
