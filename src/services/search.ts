import type {
  IHighlightItem,
  ISearchResultItem,
  ISearchResultResponse,
  ISearchSuggestionResponse,
} from '@/models';

const SEARCH_API_ENDPOINT =
  'https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json';

const SUGGESTION_API_ENDPOINT =
  'https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json';

/**
 * Fetch search results from the mock API endpoint.
 *
 * @param {string} query The search query string.
 */
export const fetchSearchResults = async (query: string) => {
  try {
    const res = await fetch(SEARCH_API_ENDPOINT);
    const data: ISearchResultResponse = await res.json();

    return {
      error: null,
      data: filterSearchResults(data, query),
    };
  } catch (error) {
    return {
      error,
      data: null,
    };
  }
};

/**
 * Returns an array of all start indices of the given substring in the given
 * string.
 *
 * @param {string} str The string to search in.
 * @param {string} substr The substring to search for.
 * @returns {number[]} An array of indices of the given substring in the given
 * string.
 */
const getAllSubstringIndexes = (str: string, substr: string) => {
  const indices: number[] = [];
  let index = str.indexOf(substr);

  while (index !== -1) {
    indices.push(index);
    index = str.indexOf(substr, index + 1);
  }

  return indices;
};

/**
 * Filter search results to only include items whose document title contains
 * the query string. Updates the total number of results to reflect the
 * filtered items count.
 * @param {ISearchResultResponse} data - The search results data to be filtered.
 * @param {string} query - The query string used to filter the results.
 * @returns {ISearchResultResponse} - The filtered search results data.
 */

const filterSearchResults = (
  data: ISearchResultResponse,
  query: string
): ISearchResultResponse => {
  const normalizedQuery = query.toLowerCase();
  const queryLength = query.length;
  const listResultItem: ISearchResultItem[] = [];

  const indexToHighlight = (index: number) => ({
    BeginOffset: index,
    EndOffset: index + queryLength,
  });

  for (const resultItem of data.ResultItems) {
    const normalizedTitle = resultItem.DocumentTitle.Text.toLowerCase();
    const normalizedExcerpt = resultItem.DocumentExcerpt.Text.toLowerCase();

    const titleIndices = getAllSubstringIndexes(
      normalizedTitle,
      normalizedQuery
    );
    const excerptIndices = getAllSubstringIndexes(
      normalizedExcerpt,
      normalizedQuery
    );

    const titleHighlights: IHighlightItem[] =
      titleIndices.map(indexToHighlight);
    const excerptHighlights: IHighlightItem[] =
      excerptIndices.map(indexToHighlight);

    if (titleHighlights.length > 0 || excerptHighlights.length > 0) {
      listResultItem.push({
        ...resultItem,
        DocumentTitle: {
          ...resultItem.DocumentTitle,
          Highlights: titleHighlights,
        },
        DocumentExcerpt: {
          ...resultItem.DocumentExcerpt,
          Highlights: excerptHighlights,
        },
      });
    }
  }

  data.ResultItems = listResultItem;
  data.TotalNumberOfResults = listResultItem.length;

  return data;
};

/**
 * Fetch search suggestions from the mock API endpoint.
 *
 * @param {string} query The search query string.
 */
export const fetchSearchSuggestions = async (query: string) => {
  try {
    const res = await fetch(SUGGESTION_API_ENDPOINT);
    const data: ISearchSuggestionResponse = await res.json();

    return {
      error: null,
      data: filterSearchSuggestions(data, query),
    };
  } catch (error) {
    return {
      error,
      data: null,
    };
  }
};

/**
 * Filter search suggestions to only include suggestions that contain the
 * query string.
 * @param {ISearchSuggestionResponse} data - The search suggestions data.
 * @param {string} query - The query string.
 * @returns {ISearchSuggestionResponse} - The filtered suggestions data.
 */
const filterSearchSuggestions = (
  data: ISearchSuggestionResponse,
  query: string
): ISearchSuggestionResponse => {
  data.suggestions = data.suggestions.filter((suggestion) =>
    suggestion.includes(query)
  );

  return data;
};
