import { userEvent } from '@vitest/browser/context';
import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';

import mockSuggestion from '@/mocks/suggestion.json';

import SearchBox from './index';

describe('SearchBox component', () => {
  test('should render', async () => {
    const screen = render(<SearchBox onSearch={() => {}} />);
    await expect.element(screen.getByTestId('search-box')).toBeInTheDocument();
  });

  describe('1. Perform Search', () => {
    test('should call onSearch when user clicks the search button', async () => {
      const onSearch = vi.fn();
      const screen = render(<SearchBox onSearch={onSearch} />);

      const input = screen.getByTestId('search-input');
      const button = screen.getByTestId('search-button');

      await userEvent.type(input, 'test query');
      await expect.element(input).toHaveValue('test query');

      await userEvent.click(button);
      expect(onSearch).toHaveBeenCalledTimes(1);
      expect(onSearch).toHaveBeenCalledWith('test query');
    });

    test('should call onSearch when user presses enter', async () => {
      const onSearch = vi.fn();
      const screen = render(<SearchBox onSearch={onSearch} />);

      const input = screen.getByTestId('search-input');

      await userEvent.type(input, 'test query');
      await expect.element(input).toHaveValue('test query');

      await userEvent.keyboard('{Enter}');
      expect(onSearch).toHaveBeenCalledTimes(1);
      expect(onSearch).toHaveBeenCalledWith('test query');
    });
  });

  describe('2a. Typeahead Suggestion Dropdown', () => {
    test('should show suggestion dropdown when user types more than 2 characters', async () => {
      const screen = render(<SearchBox onSearch={() => {}} />);

      const container = screen.getByTestId('search-box');
      const input = screen.getByTestId('search-input');

      vi.mock('@/services/search', () => ({
        fetchSearchSuggestions: () =>
          Promise.resolve({
            error: null,
            data: mockSuggestion,
          }),
      }));

      await userEvent.type(input, 'chi');

      await expect
        .element(container)
        .toHaveAttribute('data-dropdown-open', 'true');

      const suggestionDropdown = screen.getByTestId('search-suggestions');

      await expect.element(suggestionDropdown).toBeInTheDocument();
    });

    test('should not show suggestion dropdown when user types less than or equal to 2 characters', async () => {
      const screen = render(<SearchBox onSearch={() => {}} />);

      const container = screen.getByTestId('search-box');
      const input = screen.getByTestId('search-input');

      vi.mock('@/services/search', () => ({
        fetchSearchSuggestions: () =>
          Promise.resolve({
            error: null,
            data: mockSuggestion,
          }),
      }));

      await userEvent.type(input, 'ch');

      await expect
        .element(container)
        .toHaveAttribute('data-dropdown-open', 'false');

      const suggestionDropdown = screen.getByTestId('search-suggestions');

      await expect.element(suggestionDropdown).not.toBeInTheDocument();
    });
  });

  describe('2b. Select Suggestion', () => {
    test('should close dropdown and call onSearch when user clicks suggestion', async () => {
      const onSearch = vi.fn();
      const screen = render(<SearchBox onSearch={onSearch} />);

      const input = screen.getByTestId('search-input');

      vi.mock('@/services/search', () => ({
        fetchSearchSuggestions: () =>
          Promise.resolve({
            error: null,
            data: mockSuggestion,
          }),
      }));

      await userEvent.type(input, 'chi');

      const suggestionDropdown = screen.getByTestId('search-suggestions');
      await expect.element(suggestionDropdown).toBeInTheDocument();

      const suggestion = screen.getByTestId('search-suggestion-0');

      await userEvent.click(suggestion);

      await expect.element(suggestionDropdown).not.toBeInTheDocument();

      expect(onSearch).toHaveBeenCalledTimes(1);
      expect(onSearch).toHaveBeenCalledWith(mockSuggestion.suggestions[0]);
    });

    test('should close dropdown and call onSearch when user presses up or down key to select suggestion and then presses enter', async () => {
      const onSearch = vi.fn();
      const screen = render(<SearchBox onSearch={onSearch} />);

      const input = screen.getByTestId('search-input');

      vi.mock('@/services/search', () => ({
        fetchSearchSuggestions: () =>
          Promise.resolve({
            error: null,
            data: mockSuggestion,
          }),
      }));

      await userEvent.type(input, 'chi');

      const suggestionDropdown = screen.getByTestId('search-suggestions');
      await expect.element(suggestionDropdown).toBeInTheDocument();

      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowUp}');
      await userEvent.keyboard('{Enter}');

      await expect.element(suggestionDropdown).not.toBeInTheDocument();

      expect(onSearch).toHaveBeenCalledTimes(1);
      expect(onSearch).toHaveBeenCalledWith(mockSuggestion.suggestions[0]);
    });
  });

  describe('2c. X Button in SearchBar', () => {
    test('should not render X Button when input is empty', async () => {
      const screen = render(<SearchBox onSearch={() => {}} />);

      const input = screen
        .getByTestId('search-input')
        .element() as HTMLInputElement;
      expect(input.value).toBeFalsy();

      const clearButton = screen.getByTestId('search-clear-button');

      await expect.element(clearButton).not.toBeInTheDocument();
    });

    test('should render X Button when user types in input', async () => {
      const screen = render(<SearchBox onSearch={() => {}} />);

      const input = screen.getByTestId('search-input');

      await userEvent.type(input, 'test query');

      const clearButton = screen.getByTestId('search-clear-button');

      await expect.element(clearButton).toBeInTheDocument();
    });
  });

  describe('2d. Click X Button in SearchBar', () => {
    test('should clear input and close dropdown, but remain focused when user clicks X Button', async () => {
      const screen = render(<SearchBox onSearch={() => {}} />);

      const input = screen.getByTestId('search-input');

      vi.mock('@/services/search', () => ({
        fetchSearchSuggestions: () =>
          Promise.resolve({
            error: null,
            data: mockSuggestion,
          }),
      }));

      await userEvent.type(input, 'chi');

      const suggestionDropdown = screen.getByTestId('search-suggestions');
      await expect.element(suggestionDropdown).toBeInTheDocument();

      const clearButton = screen.getByTestId('search-clear-button');
      await expect.element(clearButton).toBeInTheDocument();

      await userEvent.click(clearButton);

      const inputElement = input.element() as HTMLInputElement;
      expect(inputElement.value).toBeFalsy();
      expect(inputElement).toHaveFocus();

      await expect.element(suggestionDropdown).not.toBeInTheDocument();
      await expect.element(clearButton).not.toBeInTheDocument();
    });
  });
});
