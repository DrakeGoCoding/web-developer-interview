export type SearchSuggestionResponse = {
  stemmedQueryTerm: string;
  suggestions: string[];
};

export type SearchResultResponse = {
  TotalNumberOfResults: number;
  Page: number;
  PageSize: number;
  ResultItems: SearchResultItem[];
};

export type SearchResultItem = {
  DocumentId: string;
  DocumentTitle: {
    Text: string;
    Highlights: HighlightItem[];
  };
  DocumentExcerpt: {
    Text: string;
    Highlights: HighlightItem[];
  };
  DocumentURI: string;
};

export type HighlightItem = {
  BeginOffset: number;
  EndOffset: number;
};
