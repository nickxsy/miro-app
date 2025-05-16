import type { ApiSchemas } from '@/shared/api/schema';
import { DropdownMenuItem } from '@/shared/ui/kit/dropdown-menu';

import { useDeleteBoard } from '../model/use-delete-board';
import { useUpdateFavoriteBoard } from '../model/use-update-favorite-board';
import { BoardsFavoriteToggle } from '../ui/boards-favorite-toggle';
import { BoardsListItem } from '../ui/boards-list-item';

export function BoardItem({ board }: { board: ApiSchemas['Board'] }) {
  const deleteBoard = useDeleteBoard();
  const updateFavoriteBoard = useUpdateFavoriteBoard();

  return (
    <BoardsListItem
      menuActions={
        <DropdownMenuItem
          variant="destructive"
          disabled={deleteBoard.isPending(board.id)}
          onClick={() => deleteBoard.deleteBoard(board.id)}
        >
          Удалить
        </DropdownMenuItem>
      }
      rightActions={
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
