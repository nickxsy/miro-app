import { Button } from '@/shared/ui/kit/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/ui/kit/card';
import { Switch } from '@/shared/ui/kit/switch';

type BoardsListCardProps = {
  board: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  onDelete?: () => void;
  isDeletePending?: boolean;
};

export function BoardsListCard({
  board,
  isFavorite,
  isDeletePending,
  onDelete,
  onFavoriteToggle
}: BoardsListCardProps) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{board.name}</CardTitle>
          <div>
            <Switch checked={isFavorite} onCheckedChange={onFavoriteToggle} />
          </div>
        </CardHeader>
        <CardContent>
          <p>Создано: {new Date(board.createdAt).toLocaleDateString()}</p>
          <p>
            Последнее обновление:{' '}
            {new Date(board.updatedAt).toLocaleDateString()}
          </p>
        </CardContent>
        <CardFooter>
          <Button
            disabled={isDeletePending}
            onClick={onDelete}
            variant="destructive"
          >
            Удалить
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
