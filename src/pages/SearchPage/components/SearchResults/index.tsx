import type { ISearchResultItem } from '@/models';
import SearchResultItem from '../SearchResultItem';

interface SearchResultsProps {
  items: ISearchResultItem[];
  page: number;
  pageSize: number;
  total: number;
  query: string;
}

const SearchResults = ({
  items,
  page,
  pageSize,
  total,
  query,
}: SearchResultsProps) => {
  const startIndex = (page - 1) * pageSize + 1;
  const endIndex = Math.min(startIndex + items.length - 1, total);

  if (!items.length) {
    return (
      <div>
        <h3 className="my-12">
          No results found for <span className="font-semibold">"{query}"</span>
        </h3>
      </div>
    );
  }

  return (
    <div className="py-12">
      <h3 className="font-semibold mb-10">
        Showing {startIndex} - {endIndex} of {total} results
      </h3>
      <div className="flex flex-col gap-10 max-w-4/5">
        {items.map((item) => (
          <SearchResultItem key={item.DocumentId} data={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
