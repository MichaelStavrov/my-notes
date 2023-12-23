import { CSSProperties, FC } from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import styles from './MarkedParse.module.scss';

interface MarkedParseProps {
  value: string;
  maxEllipsis?: number;
}

const MarkedParse: FC<MarkedParseProps> = ({ value, maxEllipsis }) => {
  const parsedValue = DOMPurify.sanitize(marked.parse(value) as string);

  const style: CSSProperties = maxEllipsis ? { maxWidth: maxEllipsis } : {};

  return (
    <div
      style={style}
      className={maxEllipsis ? styles.markedParse : undefined}
      dangerouslySetInnerHTML={{ __html: parsedValue }}
    />
  );
};

export default MarkedParse;
