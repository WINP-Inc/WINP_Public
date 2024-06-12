import React, { useMemo } from 'react';
import Link from 'next/link';

const useFormattedContent = (content: string) => {
  return useMemo(() => {
    const hashtagRegex = /#[\w]+/g;
    const urlRegex = /https?:\/\/[^\s]+/g;

    return content && content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line.split(' ').map((word, wordIndex) => {
          if (hashtagRegex.test(word)) {
            return <Link href={'#'} className="hash-tag" key={wordIndex}>{word} </Link>;
          } else if (urlRegex.test(word)) {
            return <Link href={`${word}`} className="url">{word} </Link>;
          }
          return `${word} `;
        })}
        <br />
      </React.Fragment>
    ));
  }, [content]);
}

export default useFormattedContent;
