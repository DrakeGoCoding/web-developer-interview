import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';

import mockQueryResult from '@/mocks/queryResult.json';

import SearchResults from './index';

describe('SearchResults', () => {
  const {
    Page: page,
    PageSize: pageSize,
    ResultItems: items,
    TotalNumberOfResults: total,
  } = mockQueryResult;
  const query = 'child care';

  test('should render results in correct format', async () => {
    const screen = render(
      <SearchResults
        items={items}
        page={page}
        pageSize={pageSize}
        total={total}
        query={query}
      />
    );

    const startIndex = (page - 1) * pageSize + 1;
    const endIndex = Math.min(startIndex + items.length - 1, total);

    // Check for correct number of results
    await expect
      .element(
        screen.getByText(
          `Showing ${startIndex} - ${endIndex} of ${total} results`
        )
      )
      .toBeInTheDocument();

    items.forEach((item) => {
      const element = screen
        .getByTestId(`search-result-item-${item.DocumentId}`)
        .element();

      expect(element).toBeInTheDocument();

      const titleElement = element.firstChild;
      const excerptElement = titleElement?.nextSibling;
      const uriElement = excerptElement?.nextSibling;

      expect(titleElement?.textContent).toBe(item.DocumentTitle.Text);
      expect(titleElement).toHaveAttribute('href', item.DocumentURI);
      expect(excerptElement?.textContent).toBe(item.DocumentExcerpt.Text);
      expect(uriElement?.textContent).toBe(item.DocumentURI);
      expect(uriElement).toHaveAttribute('href', item.DocumentURI);
    });
  });
});
