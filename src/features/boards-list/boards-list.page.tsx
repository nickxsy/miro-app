import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { useDebouncedValue } from '@/shared/lib/react';
import { Button } from '@/shared/ui/kit/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/ui/kit/select';

import {
  type BoardsSortOption,
  useBoardsFilters
} from './model/use-boards-filters';
import { useBoardsList } from './model/use-boards-list';
import { useCreateBoard } from './model/use-create-board';
import { useDeleteBoard } from './model/use-delete-board';
import { useUpdateFavoriteBoard } from './model/use-update-favorite-board';
import { BoardsListCard } from './ui/boards-list-card';
import {
  BoardsListLayout,
  BoardsListLayoutCards,
  BoardsListLayoutContent,
  BoardsListLayoutFilter,
  BoardsListLayoutHeader,
  BoardsListLayoutList
} from './ui/boards-list-layout';
import { type ViewMode, ViewModeToggle } from './ui/view-mode-toggle';

function BoardsListPage() {
  const boardsFilters = useBoardsFilters();
  const boardsQuery = useBoardsList({
    sort: boardsFilters.sort,
    search: useDebouncedValue(boardsFilters.search, 500)
  });
  const createBoard = useCreateBoard();
  const deleteBoard = useDeleteBoard();
  const updateFavoriteBoard = useUpdateFavoriteBoard();

  const [view, setView] = useState<ViewMode>('list');

  return (
    <BoardsListLayout
      header={
        <BoardsListLayoutHeader
          title="Доски"
          descrition="Здесь вы можете управлять досками"
          actions={
            <>
              <ViewModeToggle value={view} onChange={setView} />
            </>
          }
        />
      }
      filters={
        <BoardsListLayoutFilter
          sort={
            <Select
              value={boardsFilters.sort}
              onValueChange={value =>
                boardsFilters.setSort(value as BoardsSortOption)
              }
            >
              <SelectTrigger id="sort">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lastOpenedAt">По дате открытие</SelectItem>
                <SelectItem value="createdAt">По дате создания</SelectItem>
                <SelectItem value="updatedAt">По дате обновления</SelectItem>
                <SelectItem value="name">По названию</SelectItem>
              </SelectContent>
            </Select>
          }
          filters={<></>}
          actions={
            <Button
              onClick={createBoard.createBoard}
              disabled={createBoard.isPending}
            >
              <PlusIcon />
              Создать доску
            </Button>
          }
        />
      }
    >
      <div className="py-4">
        {/* <header className="py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between">
              <div className="w-full max-w-[600px] grow">
                <Label>Поиск</Label>
                <Input
                  value={boardsFilters.search}
                  onChange={e => boardsFilters.setSearch(e.target.value)}
                  placeholder="Введите название доски"
                />
              </div>
            </div>
            <div className="py-4">
              <Button
                onClick={createBoard.createBoard}
                disabled={createBoard.isPending}
              >
                Создать доску
              </Button>
            </div>
          </div>
        </header> */}
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

export const Component = BoardsListPage;
