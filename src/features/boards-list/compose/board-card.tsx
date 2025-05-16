import type { ApiSchemas } from '@/shared/api/schema';
import { Button } from '@/shared/ui/kit/button';

import { useDeleteBoard } from '../model/use-delete-board';
import { useUpdateFavoriteBoard } from '../model/use-update-favorite-board';
import { BoardsFavoriteToggle } from '../ui/boards-favorite-toggle';
import { BoardsListCard } from '../ui/boards-list-card';

export function BoardCard({ board }: { board: ApiSchemas['Board'] }) {
  const deleteBoard = useDeleteBoard();
  const updateFavoriteBoard = useUpdateFavoriteBoard();

  return (
    <BoardsListCard
      bottomActions={
        <Button
          variant="destructive"
          disabled={deleteBoard.isPending(board.id)}
          onClick={() => deleteBoard.deleteBoard(board.id)}
        >
          Удалить
        </Button>
      }
      rightTopActions={
        <BoardsFavoriteToggle
          isFavorite={board.isFavorite}
          onFavoriteToggle={() => updateFavoriteBoard.toggle(board)}
        />
      }
      key={board.id}
      board={board}
    />
  );
}
