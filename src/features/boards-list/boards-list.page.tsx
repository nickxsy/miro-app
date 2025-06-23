import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { useDebouncedValue } from '@/shared/lib/react';
import { Button, Select } from '@/shared/ui';

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
            <Button.Root
              onClick={createBoard.createBoard}
              disabled={createBoard.isPending}
            >
              <PlusIcon />
              Создать доску
            </Button.Root>
          }
        />
      }
      filters={
        <BoardsListLayoutFilter
          sort={
            <Select.Root
              value={boardsFilters.sort}
              onValueChange={value =>
                boardsFilters.setSort(value as BoardsSortOption)
              }
            >
              <Select.Trigger id="sort">
                <Select.Value placeholder="Сортировка" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="lastOpenedAt">По дате открытие</Select.Item>
                <Select.Item value="createdAt">По дате создания</Select.Item>
                <Select.Item value="updatedAt">По дате обновления</Select.Item>
                <Select.Item value="name">По названию</Select.Item>
              </Select.Content>
            </Select.Root>
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
          boardsQuery.boards.map(board => (
            <BoardCard key={board.id} board={board} />
          ))
        }
        renderList={() =>
          boardsQuery.boards.map(board => (
            <BoardItem key={board.id} board={board} />
          ))
        }
      />
    </BoardsListLayout>
  );
}

export const Component = BoardsListPage;
