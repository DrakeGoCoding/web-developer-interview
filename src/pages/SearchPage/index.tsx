import { useState } from 'react';

import { SearchResultResponse } from '@/models';
import { fetchSearchResults } from '@/services/search';

import SearchBox from './components/SearchBox';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<SearchResultResponse | null>(null);
  const [error, setError] = useState<unknown>(null);

  const handleSearch = async (query: string) => {
    const res = await fetchSearchResults(query);

    setQuery(query);
    setData(res.data);
    setError(res.error);
  };

  return (
    <div className="bg-white">
      <div className="shadow-general">
        <div className="mx-auto max-w-6xl py-12">
          <SearchBox onSearch={handleSearch} />
        </div>
      </div>
      <div className="mx-auto max-w-6xl"></div>
    </div>
  );
};

export default SearchPage;
