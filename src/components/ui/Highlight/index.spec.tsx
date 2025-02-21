import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

import { IHighlightItem } from '@/models';

import Highlight from './index';

describe('Highlight component', () => {
  it('renders with string highlight', async () => {
    const highlight = 'test';
    const children = 'This is a test';
    const screen = render(
      <Highlight highlight={highlight} children={children} />
    );
    await expect
      .element(screen.getByText('This is a test'))
      .toBeInTheDocument();
    expect(
      screen.getByText(/test/i).query()?.getAttribute('data-highlight')
    ).toBe('true');
  });

  it('renders with IHighlightItem[] highlight', async () => {
    const highlight: IHighlightItem[] = [{ BeginOffset: 0, EndOffset: 4 }];
    const children = 'This is a test';
    const screen = render(
      <Highlight highlight={highlight} children={children} />
    );
    await expect
      .element(screen.getByText('This is a test'))
      .toBeInTheDocument();
    expect(
      screen.getByText(/This/i).query()?.getAttribute('data-highlight')
    ).toBe('true');
  });

  it('renders with empty highlight', async () => {
    const highlight = '';
    const children = 'This is a test';
    const screen = render(
      <Highlight highlight={highlight} children={children} />
    );
    await expect
      .element(screen.getByText('This is a test'))
      .toBeInTheDocument();
  });

  it('renders with empty children', async () => {
    const highlight = 'test';
    const children = '';
    const screen = render(
      <Highlight highlight={highlight} children={children} />
    );
    await expect.element(screen.getByText('')).toBeInTheDocument();
  });
});
