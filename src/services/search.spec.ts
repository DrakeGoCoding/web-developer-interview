import { afterEach, describe, expect, it, vi } from 'vitest';

import mockQueryResult from '@/mocks/queryResult.json';
import mockSuggestion from '@/mocks/suggestion.json';

import { fetchSearchResults, fetchSearchSuggestions } from './search';

describe('fetchSearchResults', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return an object with data and no error if successful', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockQueryResult),
      } as Response)
    );

    const query = 'test query';
    const response = await fetchSearchResults(query);
    expect(response.error).toBeNull();
    expect(response.data).toBeDefined();
  });

  it('should return an object with error and no data if unsuccessful', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.reject(new Error('Network error')),
      } as Response)
    );

    const query = 'test query';
    const response = await fetchSearchResults(query);
    expect(response.error).toBeDefined();
    expect(response.data).toBeNull();
  });
});

describe('fetchSearchSuggestions', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return an object with data and no error if successful', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockSuggestion),
      } as Response)
    );

    const query = 'test query';
    const response = await fetchSearchSuggestions(query);
    expect(response.error).toBeNull();
    expect(response.data).toBeDefined();
  });

  it('should return an object with error and no data if unsuccessful', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.reject(new Error('Network error')),
      } as Response)
    );

    const query = 'test query';
    const response = await fetchSearchSuggestions(query);
    expect(response.error).toBeDefined();
    expect(response.data).toBeNull();
  });
});
