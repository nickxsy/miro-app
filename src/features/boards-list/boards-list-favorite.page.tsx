import { useState } from 'react';

import { useBoardsList } from './model/use-boards-list';
import { useDeleteBoard } from './model/use-delete-board';
import { useUpdateFavoriteBoard } from './model/use-update-favorite-board';
import { BoardsListCard } from './ui/boards-list-card';
import {
  BoardsListLayout,
  BoardsListLayoutCards,
  BoardsListLayoutContent,
  BoardsListLayoutHeader,
  BoardsListLayoutList
} from './ui/boards-list-layout';
import { type ViewMode, ViewModeToggle } from './ui/view-mode-toggle';

function BoardsListFavoritePage() {
  const boardsQuery = useBoardsList({
    isFavorite: true
  });
  const deleteBoard = useDeleteBoard();
  const updateFavoriteBoard = useUpdateFavoriteBoard();

  const [view, setView] = useState<ViewMode>('list');

  return (
    <BoardsListLayout
      header={
        <BoardsListLayoutHeader
          title="Избранные доски"
          descrition="Здесь вы можете управлять досками"
          actions={
            <>
              <ViewModeToggle value={view} onChange={setView} />
            </>
          }
        />
      }
    >
      <div className="py-4">
        <BoardsListLayoutContent
          isPending={boardsQuery.isPending}
          isEmpty={boardsQuery.boards.length === 0}
          hasCursor={boardsQuery.hasNextPage}
          isPendingNext={boardsQuery.isFetchingNextPage}
        >
          {view === 'cards' && (
            <BoardsListLayoutCards>
              {boardsQuery.boards.map(board => (
                <BoardsListCard
                  isDeletePending={deleteBoard.isPending(board.id)}
                  isFavorite={updateFavoriteBoard.isOptimisticFavorite(board)}
                  onDelete={() => deleteBoard.deleteBoard(board.id)}
                  onFavoriteToggle={() => updateFavoriteBoard.toggle(board)}
                  key={board.id}
                  board={board}
                />
              ))}
            </BoardsListLayoutCards>
          )}
          {view === 'list' && (
            <BoardsListLayoutList>
              {boardsQuery.boards.map(board => (
                <BoardsListCard
                  isDeletePending={deleteBoard.isPending(board.id)}
                  isFavorite={updateFavoriteBoard.isOptimisticFavorite(board)}
                  onDelete={() => deleteBoard.deleteBoard(board.id)}
                  onFavoriteToggle={() => updateFavoriteBoard.toggle(board)}
                  key={board.id}
                  board={board}
                />
              ))}
            </BoardsListLayoutList>
          )}
        </BoardsListLayoutContent>
      </div>
    </BoardsListLayout>
  );
}

export const Component = BoardsListFavoritePage;
