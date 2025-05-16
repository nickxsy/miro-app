import { Link, href } from 'react-router';

import { ROUTES } from '@/shared/model/routes';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/ui/kit/card';

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
    <Card className="relative">
      {rightTopActions && (
        <div className="absolute top-4 right-4">{rightTopActions}</div>
      )}

      <CardHeader>
        <CardTitle>
          <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
            <p className="block max-w-[calc(100%-60px)] truncate text-lg font-medium">
              {board.name}
            </p>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Создано: {new Date(board.createdAt).toLocaleDateString()}</p>
        <p>
          Последнее обновление: {new Date(board.updatedAt).toLocaleDateString()}
        </p>
      </CardContent>
      {bottomActions && <CardFooter>{bottomActions}</CardFooter>}
    </Card>
  );
}
