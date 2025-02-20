import { categorizeByHighlight } from '@/utils/highlight';
import { useMemo } from 'react';

interface HighlightProps {
  highlight: string;
  children: string;
}

const Highlight = ({ highlight, children }: HighlightProps) => {
  const parts = useMemo(
    () =>
      categorizeByHighlight(children.toLowerCase(), highlight.toLowerCase()),
    [children, highlight]
  );

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
