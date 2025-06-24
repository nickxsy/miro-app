import { Link, href } from 'react-router';

import { ROUTES } from '@/shared/model';
import { Card } from '@/shared/ui';

type BoardsListCardProps = {
  board: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  rightTopActions?: React.ReactNode;
  bottomActions?: React.ReactNode;
};

export function BoardsListCard({
  board,
  bottomActions,
  rightTopActions
}: BoardsListCardProps) {
  return (
    <Card.Root className="relative">
      {rightTopActions && (
        <div className="absolute top-4 right-4">{rightTopActions}</div>
      )}

      <Card.Header>
        <Card.Title>
          <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
            <p className="block max-w-[calc(100%-60px)] truncate text-lg font-medium">
              {board.name}
            </p>
          </Link>
        </Card.Title>
      </Card.Header>
      <Card.Content>
        <p>Создано: {new Date(board.createdAt).toLocaleDateString()}</p>
        <p>
          Последнее обновление: {new Date(board.updatedAt).toLocaleDateString()}
        </p>
      </Card.Content>
      {bottomActions && <Card.Footer>{bottomActions}</Card.Footer>}
    </Card.Root>
  );
}
