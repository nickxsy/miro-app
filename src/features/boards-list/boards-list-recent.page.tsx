import { useState } from 'react';

import { BoardCard } from './compose/board-card';
import { BoardItem } from './compose/board-item';
import { useBoardsList } from './model/use-boards-list';
import { useRecentGroups } from './model/use-recent-groups';
import {
  BoardsListLayout,
  BoardsListLayoutCards,
  BoardsListLayoutContent,
  BoardsListLayoutContentGroups,
  BoardsListLayoutHeader,
  BoardsListLayoutItems
} from './ui/boards-list-layout';
import { BoardsListSidebar } from './ui/boards-list-sidebar';
import { type ViewMode, ViewModeToggle } from './ui/view-mode-toggle';

function BoardsListRecentPage() {
  const boardsQuery = useBoardsList({
    sort: 'lastOpenedAt'
  });

  const [view, setView] = useState<ViewMode>('list');

  const recentGroups = useRecentGroups(boardsQuery.boards);

  return (
    <BoardsListLayout
      sidebar={<BoardsListSidebar />}
      header={
        <BoardsListLayoutHeader
          title="Последние доски"
          descrition="Здесь вы можете управлять досками"
          actions={<ViewModeToggle value={view} onChange={setView} />}
        />
      }
    >
      <BoardsListLayoutContent
        isPending={boardsQuery.isPending}
        isEmpty={boardsQuery.boards.length === 0}
        hasCursor={boardsQuery.hasNextPage}
        currsorRef={boardsQuery.cursorRef}
        isPendingNext={boardsQuery.isFetchingNextPage}
        mode={view}
      >
        <BoardsListLayoutContentGroups
          groups={recentGroups.map(group => ({
            items: {
              list: (
                <BoardsListLayoutItems>
                  {group.items.map(board => (
                    <BoardItem key={board.id} board={board} />
                  ))}
                </BoardsListLayoutItems>
              ),
              cards: (
                <BoardsListLayoutCards>
                  {group.items.map(board => (
                    <BoardCard key={board.id} board={board} />
                  ))}
                </BoardsListLayoutCards>
              )
            }[view],
            title: group.title
          }))}
        />
      </BoardsListLayoutContent>
    </BoardsListLayout>
  );
}

export const Component = BoardsListRecentPage;
