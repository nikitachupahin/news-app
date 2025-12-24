import React from 'react';
import { highlightKeywords } from '../../utils/searchUtils';

interface HighlightedTextProps {
  text: string;
  keywords: string;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  keywords,
}) => {
  const parts = highlightKeywords(text, keywords);

  return (
    <>
      {parts.map((part, i) =>
        part.isHighlighted ? (
          <span key={i} style={{ backgroundColor: '#FFF619A1' }}>
            {part.text}
          </span>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  );
};
