import { useRef, useState } from 'react';

import { CrossIcon, SearchIcon } from '@/components/icons';
import Highlight from '@/components/ui/Highlight';
import { useDebounceCallback } from '@/hooks/useDebounceCallback';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { fetchSearchSuggestions } from '@/services/search';

interface SearchBoxProps {
  onSearch: (text: string) => void;
}

const SearchBox = ({ onSearch }: SearchBoxProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const shouldShowDropdown = isDropdownOpen && suggestions.length > 0;

  const getInputValue = () => inputRef.current?.value || '';

  const debouncedInput = useDebounceCallback(async (value: string) => {
    const { data, error } = await fetchSearchSuggestions(value);

    if (error) {
      console.error(error);
    }

    if (data) {
      setSuggestions(data.suggestions);
      if (data.suggestions.length > 0) {
        setIsDropdownOpen(true);
      }
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedInput.cancel();
    const value = e.target.value;
    if (value.length > 2) {
      debouncedInput(value);
    } else {
      setSuggestions([]);
      handleCloseDropdown();
    }
  };

  const handleInputKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        if (activeSuggestionIndex >= 0) {
          return handleSelectSuggestion(suggestions[activeSuggestionIndex]);
        }
        return handleSubmit();

      case 'Escape':
        handleCloseDropdown();
        break;

      case 'ArrowDown':
        setActiveSuggestionIndex((prev) => (prev + 1) % suggestions.length);
        break;

      case 'ArrowUp':
        setActiveSuggestionIndex((prev) =>
          prev === -1
            ? suggestions.length - 1
            : (prev - 1 + suggestions.length) % suggestions.length
        );
        break;

      default:
        break;
    }
  };

  const handleClearInput = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    inputRef.current?.focus();
    handleCloseDropdown();
  };

  const handleSelectSuggestion = (suggestion: string) => {
    if (inputRef.current) {
      inputRef.current.value = suggestion;
    }
    handleSubmit();
  };

  const handleSubmit = () => {
    handleCloseDropdown();
    debouncedInput.cancel();

    const value = getInputValue();
    if (value) {
      onSearch(value);
    }
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
    setActiveSuggestionIndex(-1);
  };

  useOnClickOutside(containerRef, handleCloseDropdown);

  return (
    <div
      ref={containerRef}
      data-testid="search-box"
      data-dropdown-open={shouldShowDropdown}
      className="flex flex-row border-[#A4A4A4] border rounded-lg focus-within:border-primary data-[dropdown-open=true]:rounded-bl-none"
    >
      <div className="flex-grow relative">
        <input
          ref={inputRef}
          data-testid="search-input"
          className="w-full h-full rounded-lg focus:outline-none focus:ring-0 pl-6 pr-17"
          autoFocus
          onChange={handleInputChange}
          onKeyDown={handleInputKeydown}
          onFocus={() => setIsDropdownOpen(true)}
        />
        {getInputValue().length > 0 && (
          <button
            data-testid="search-clear-button"
            className="absolute top-[50%] right-4 -translate-y-[50%] text-[#616161] cursor-pointer hover:bg-[#F0F0F0] rounded-xl"
            onClick={handleClearInput}
          >
            <CrossIcon />
          </button>
        )}
        {shouldShowDropdown && (
          <div
            data-testid="search-suggestions"
            className="absolute w-full rounded-b-lg shadow-general bg-white top-[calc(100%+1px)]"
          >
            <div className="flex flex-col py-2">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  data-testid={`search-suggestion-${index}`}
                  data-active={activeSuggestionIndex === index}
                  className="py-2 px-6 hover:bg-[#F0F0F0] cursor-default data-[active=true]:bg-[#F0F0F0]"
                  onMouseEnter={() => setActiveSuggestionIndex(index)}
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  <Highlight highlight={getInputValue()}>
                    {suggestion}
                  </Highlight>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <button
        data-testid="search-button"
        className="bg-primary text-white text-lg flex flex-row items-center justify-center gap-1.5 rounded-lg px-8 py-4 cursor-pointer translate-x-[1px]"
        onClick={handleSubmit}
      >
        <SearchIcon />
        <span className="">Search</span>
      </button>
    </div>
  );
};

export default SearchBox;
