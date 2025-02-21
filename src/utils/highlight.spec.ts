import { describe, expect, it } from 'vitest';

import type { IHighlightItem } from '@/models';

import {
  categorizeByHighlight,
  categorizeHighlightInDocument,
} from './highlight';

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

describe('categorizeHighlightInDocument', () => {
  it('should return the whole text as non-highlighted when there are no highlights', () => {
    const text = 'Hello World';
    const highlights: IHighlightItem[] = [];
    const result = categorizeHighlightInDocument(text, highlights);
    expect(result).toEqual([{ text, highlight: false }]);
  });

  it('should return an empty array when the text is empty', () => {
    const text = '';
    const highlights: IHighlightItem[] = [];
    const result = categorizeHighlightInDocument(text, highlights);
    expect(result).toEqual([]);
  });

  it('should highlight a single highlight', () => {
    const text = 'Hello World';
    const highlights: IHighlightItem[] = [{ BeginOffset: 6, EndOffset: 11 }];
    const result = categorizeHighlightInDocument(text, highlights);
    expect(result).toEqual([
      { text: 'Hello ', highlight: false },
      { text: 'World', highlight: true },
    ]);
  });

  it('should highlight multiple highlights', () => {
    const text = 'Hello World Foo Bar';
    const highlights: IHighlightItem[] = [
      { BeginOffset: 6, EndOffset: 11 },
      { BeginOffset: 15, EndOffset: 18 },
    ];
    const result = categorizeHighlightInDocument(text, highlights);
    expect(result).toEqual([
      { text: 'Hello ', highlight: false },
      { text: 'World', highlight: true },
      { text: ' Foo', highlight: false },
      { text: ' Ba', highlight: true },
      { text: 'r', highlight: false },
    ]);
  });
});
