import { CrossIcon, SearchIcon } from '@/components/icons';
import Highlight from '@/components/ui/Highlight';

import mockSuggestions from '@/mocks/suggestion.json';

const SearchBox = () => {
  return (
    <div className="flex flex-row border-[#A4A4A4] border rounded-lg focus-within:border-primary">
      <div className="flex-grow relative">
        <input className="w-full h-full rounded-lg focus:outline-none focus:ring-0 pl-6 pr-17" />
        <button className="absolute top-[50%] right-4 -translate-y-[50%] text-[#616161] cursor-pointer hover:bg-[#F0F0F0] rounded-xl">
          <CrossIcon />
        </button>
        <div className="absolute w-full rounded-b-lg shadow-general bg-white top-[calc(100%+1px)]">
          <div className="flex flex-col py-2">
            {mockSuggestions.suggestions.map((suggestion) => (
              <div key={suggestion} className="py-2 px-6 hover:bg-[#F0F0F0]">
                <Highlight highlight="chi">{suggestion}</Highlight>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className="bg-primary text-white text-lg flex flex-row items-center justify-center gap-1.5 rounded-lg px-8 py-4 cursor-pointer">
        <SearchIcon />
        <span className="">Search</span>
      </button>
    </div>
  );
};

export default SearchBox;
