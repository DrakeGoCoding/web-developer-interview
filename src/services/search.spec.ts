import { describe, expect, it, vi } from 'vitest';

import type { SearchResultResponse } from '@/models';

import { fetchSearchResults, fetchSearchSuggestions } from './search';

describe('fetchSearchResults', () => {
  it('should return an object with data and no error if successful', async () => {
    vi.mock('fetch', () => {
      return vi.fn(() => {
        return Promise.resolve({
          json: () => Promise.resolve({} as SearchResultResponse),
        });
      });
    });

    const query = 'test query';
    const response = await fetchSearchResults(query);
    expect(response.error).toBeNull();
    expect(response.data).toBeDefined();
  });

  it('should return an object with error and no data if unsuccessful', async () => {
    vi.mock('fetch', () => {
      return vi.fn(() => {
        return Promise.reject(new Error('Network error'));
      });
    });
    const query = 'test query';
    const response = await fetchSearchResults(query);
    expect(response.error).toBeDefined();
    expect(response.data).toBeNull();
  });
});

describe('fetchSearchSuggestions', () => {
  it('should return an object with data and no error if successful', async () => {
    vi.mock('fetch', () => {
      return vi.fn(() => {
        return Promise.resolve({
          json: () => Promise.resolve({} as SearchResultResponse),
        });
      });
    });

    const query = 'test query';
    const response = await fetchSearchSuggestions(query);
    expect(response.error).toBeNull();
    expect(response.data).toBeDefined();
  });

  it('should return an object with error and no data if unsuccessful', async () => {
    vi.mock('fetch', () => {
      return vi.fn(() => {
        return Promise.reject(new Error('Network error'));
      });
    });
    const query = 'test query';
    const response = await fetchSearchSuggestions(query);
    expect(response.error).toBeDefined();
    expect(response.data).toBeNull();
  });
});
