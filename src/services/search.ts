import type { SearchSuggestionResponse } from '@/models';

const SUGGESTION_API_ENDPOINT =
  'https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json';

export const fetchSearchSuggestions = async (query: string) => {
  try {
    const res = await fetch(SUGGESTION_API_ENDPOINT);
    const data: SearchSuggestionResponse = await res.json();

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

const filterSearchSuggestions = (
  data: SearchSuggestionResponse,
  query: string
) => {
  data.suggestions = data.suggestions.filter((suggestion) =>
    suggestion.includes(query)
  );
  return data;
};
