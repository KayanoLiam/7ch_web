import type React from 'react';

import type { Post } from '../../types';

const quotePattern = />>(\d{1,7})/g;

const renderSegment = (segment: string, index: number) => {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  quotePattern.lastIndex = 0;
  while ((match = quotePattern.exec(segment)) !== null) {
    if (match.index > lastIndex) {
      parts.push(segment.slice(lastIndex, match.index));
    }
    const id = match[1];
    parts.push(
      <a key={`${index}-${match.index}`} className="bbs-link" href={`#p${id}`} data-quote-id={id}>
        &gt;&gt;{id}
      </a>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < segment.length) {
    parts.push(segment.slice(lastIndex));
  }

  return parts.length > 0 ? parts : segment;
};

export function PostText({ content }: { content: string; allPosts?: Post[] }) {
  const lines = content.split('\n');
  return (
    <div className="break-words text-[15px] leading-relaxed text-[#333] dark:text-gray-200">
      {lines.map((line, index) => (
        <p key={index} className="mb-2 whitespace-pre-wrap last:mb-0">
          {renderSegment(line, index)}
        </p>
      ))}
    </div>
  );
}
