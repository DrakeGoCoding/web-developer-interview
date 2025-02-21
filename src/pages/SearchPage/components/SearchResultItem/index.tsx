import Highlight from '@/components/ui/Highlight';
import type { ISearchResultItem } from '@/models';

interface SearchResultItemProps {
  data: ISearchResultItem;
}

const SearchResultItem = ({ data }: SearchResultItemProps) => {
  return (
    <div className="flex flex-col gap-3">
      <a
        className="font-semibold text-primary text-[22px] hover:underline visited:text-purple-600"
        href={data.DocumentURI}
      >
        {data.DocumentTitle.Text}
      </a>
      <div className="line-clamp-2 leading-6">
        <Highlight highlight={data.DocumentExcerpt.Highlights}>
          {data.DocumentExcerpt.Text}
        </Highlight>
      </div>
      <a
        className="text-sm text-[#686868] line-clamp-1"
        href={data.DocumentURI}
      >
        {data.DocumentURI}
      </a>
    </div>
  );
};

export default SearchResultItem;
