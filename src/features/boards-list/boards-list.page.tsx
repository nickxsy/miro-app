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

import { BoardCard } from './compose/board-card';
import { BoardItem } from './compose/board-item';
import {
  type BoardsSortOption,
  useBoardsFilters
} from './model/use-boards-filters';
import { useBoardsList } from './model/use-boards-list';
import { useCreateBoard } from './model/use-create-board';
import {
  BoardsListLayout,
  BoardsListLayoutContent,
  BoardsListLayoutFilter,
  BoardsListLayoutHeader
} from './ui/boards-list-layout';
import { BoardsListSidebar } from './ui/boards-list-sidebar';
import { type ViewMode, ViewModeToggle } from './ui/view-mode-toggle';

function BoardsListPage() {
  const boardsFilters = useBoardsFilters();
  const boardsQuery = useBoardsList({
    sort: boardsFilters.sort,
    search: useDebouncedValue(boardsFilters.search, 500)
  });
  const createBoard = useCreateBoard();

  const [view, setView] = useState<ViewMode>('list');

  return (
    <BoardsListLayout
      sidebar={<BoardsListSidebar />}
      header={
        <BoardsListLayoutHeader
          title="Доски"
          descrition="Здесь вы можете управлять досками"
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
          actions={<ViewModeToggle value={view} onChange={setView} />}
        />
      }
    >
      <BoardsListLayoutContent
        currsorRef={boardsQuery.cursorRef}
        isPending={boardsQuery.isPending}
        isEmpty={boardsQuery.boards.length === 0}
        hasCursor={boardsQuery.hasNextPage}
        mode={view}
        isPendingNext={boardsQuery.isFetchingNextPage}
        renderCards={() =>
          boardsQuery.boards.map(board => <BoardCard board={board} />)
        }
        renderList={() =>
          boardsQuery.boards.map(board => <BoardItem board={board} />)
        }
      ></BoardsListLayoutContent>
    </BoardsListLayout>
  );
}

export const Component = BoardsListPage;
