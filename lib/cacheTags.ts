export const cacheTags = {
  boards: 'boards',
  threads: 'threads',
  board: (boardId: string) => `board:${boardId}`,
  boardPage: (boardId: string, page: number) => `board:${boardId}:page:${page}`,
  thread: (threadId: string) => `thread:${threadId}`,
  sitemapThreads: 'sitemap:threads',
};

