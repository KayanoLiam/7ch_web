import { ImageResponse } from 'next/og';

import { getThreadDetail } from '../../../../../lib/api/server';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

type ImageProps = {
  params: Promise<{ threadId: string }>;
};

export default async function Image({ params }: ImageProps) {
  const { threadId } = await params;
  const thread = await getThreadDetail(threadId, { trackView: false });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f5f7fb',
          color: '#172033',
          padding: 64,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 700, color: '#22818d' }}>7ちゃんねる /{thread.boardId}/</div>
        <div style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.12, maxHeight: 300, overflow: 'hidden' }}>
          {thread.title}
        </div>
        <div style={{ display: 'flex', gap: 28, fontSize: 28, color: '#526070' }}>
          <span>{thread.postCount} replies</span>
          <span>{thread.viewCount} views</span>
        </div>
      </div>
    ),
    size,
  );
}
