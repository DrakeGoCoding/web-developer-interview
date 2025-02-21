import { IHighlightItem } from '@/models';
import {
  categorizeByHighlight,
  categorizeHighlightInDocument,
} from '@/utils/highlight';
import { useMemo } from 'react';

interface HighlightProps {
  highlight: string | IHighlightItem[];
  children: string;
}

const Highlight = ({ highlight, children }: HighlightProps) => {
  const parts = useMemo(() => {
    if (typeof highlight === 'string') {
      return categorizeByHighlight(
        children.toLowerCase(),
        highlight.toLowerCase()
      );
    }
    return categorizeHighlightInDocument(children.toLowerCase(), highlight);
  }, [children, highlight]);

  return (
    <p>
      {parts.map(({ text, highlight }, index) => {
        return (
          <span
            key={index}
            data-highlight={highlight}
            className="data-[highlight=true]:font-bold"
          >
            {text}
          </span>
        );
      })}
    </p>
  );
};

export default Highlight;
