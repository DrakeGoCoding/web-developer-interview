export interface ISearchSuggestionResponse {
  stemmedQueryTerm: string;
  suggestions: string[];
}

export interface ISearchResultResponse {
  TotalNumberOfResults: number;
  Page: number;
  PageSize: number;
  ResultItems: ISearchResultItem[];
}

export interface ISearchResultItem {
  DocumentId: string;
  DocumentTitle: {
    Text: string;
    Highlights: IHighlightItem[];
  };
  DocumentExcerpt: {
    Text: string;
    Highlights: IHighlightItem[];
  };
  DocumentURI: string;
  Type?: string;
}

export interface IHighlightItem {
  BeginOffset: number;
  EndOffset: number;
}
