import { useState } from 'react';

import type { ISearchResultResponse } from '@/models';
import { fetchSearchResults } from '@/services/search';

import SearchBox from './components/SearchBox';
import SearchResults from './components/SearchResults';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<ISearchResultResponse | null>(null);
  const [error, setError] = useState<unknown>(null);

  const handleSearch = async (query: string) => {
    const res = await fetchSearchResults(query);

    setQuery(query);
    setData(res.data);
    setError(res.error);
  };

  return (
    <div className="bg-white">
      <div className="shadow-general sticky top-0 bg-white z-10 px-4">
        <div className="mx-auto max-w-6xl py-12">
          <SearchBox onSearch={handleSearch} />
        </div>
      </div>
      <div className="px-4">
        <div className="mx-auto max-w-6xl">
          {!!data && (
            <SearchResults
              items={data.ResultItems}
              page={data.Page}
              pageSize={data.PageSize}
              total={data.TotalNumberOfResults}
              query={query}
            />
          )}
          {!!error && (
            <h3 className="text-red-500 my-12">
              Something went wrong. Please try again later.
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
