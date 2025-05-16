import { MoreHorizontalIcon } from 'lucide-react';
import { Link, href } from 'react-router';

import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/kit/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/shared/ui/kit/dropdown-menu';

type BoardsListCardProps = {
  board: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  rightActions?: React.ReactNode;
  menuActions?: React.ReactNode;
};

export function BoardsListItem({
  board,
  rightActions,
  menuActions
}: BoardsListCardProps) {
  return (
    <div className="flex items-center gap-4 border-b p-4 last:border-b-0">
      <div className="min-w-0 flex-grow">
        <Button
          asChild
          variant="link"
          className="h-auto justify-start p-0 text-left"
        >
          <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
            <span className="block truncate text-lg font-medium">
              {board.name}
            </span>
          </Link>
        </Button>
        <div className="mt-1 flex gap-4 text-sm text-gray-500">
          <div>Создано: {new Date(board.createdAt).toLocaleDateString()}</div>
          <div>
            Последнее открытие: {new Date(board.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
      {(rightActions || menuActions) && (
        <div className="flex items-center gap-2">
          {rightActions}
          {menuActions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {menuActions}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}
    </div>
  );
}
