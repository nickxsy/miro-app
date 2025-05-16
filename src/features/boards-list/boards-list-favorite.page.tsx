import { useState } from 'react';

import { BoardCard } from './compose/board-card';
import { BoardItem } from './compose/board-item';
import { useBoardsList } from './model/use-boards-list';
import { useUpdateFavoriteBoard } from './model/use-update-favorite-board';
import {
  BoardsListLayout,
  BoardsListLayoutContent,
  BoardsListLayoutHeader
} from './ui/boards-list-layout';
import { BoardsListSidebar } from './ui/boards-list-sidebar';
import { type ViewMode, ViewModeToggle } from './ui/view-mode-toggle';

function BoardsListFavoritePage() {
  const boardsQuery = useBoardsList({
    isFavorite: true
  });

  const updateFavorite = useUpdateFavoriteBoard();

  const [view, setView] = useState<ViewMode>('list');

  const boards = boardsQuery.boards.filter(board =>
    updateFavorite.isOptimisticFavorite(board)
  );

  return (
    <BoardsListLayout
      sidebar={<BoardsListSidebar />}
      header={
        <BoardsListLayoutHeader
          title="Избранные доски"
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
        renderCards={() => boards.map(board => <BoardCard board={board} />)}
        renderList={() =>
          boards.map(
            board =>
              updateFavorite.isOptimisticFavorite(board) && (
                <BoardItem board={board} />
              )
          )
        }
      ></BoardsListLayoutContent>
    </BoardsListLayout>
  );
}

export const Component = BoardsListFavoritePage;
