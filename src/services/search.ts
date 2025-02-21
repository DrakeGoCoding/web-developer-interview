import type {
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
  data.ResultItems = data.ResultItems.filter(
    (resultItem) =>
      resultItem.DocumentTitle.Text.toLowerCase().includes(
        query.toLowerCase()
      ) ||
      resultItem.DocumentExcerpt.Text.toLowerCase().includes(
        query.toLowerCase()
      )
  );
  data.TotalNumberOfResults = data.ResultItems.length;

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
