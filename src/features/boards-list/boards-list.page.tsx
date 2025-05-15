import { rqClient } from '@/shared/api/instance';
import { Button } from '@/shared/ui/kit/button';

function BoardsListPage() {
  const boards = rqClient.useQuery('get', '/boards');
  const boardDeleteMutation = rqClient.useMutation(
    'delete',
    '/boards/{boardId}'
  );

  return (
    <div className="py-4">
      <div className="container mx-auto px-4">
        BoardsList
        <ul className="grid grid-cols-3 gap-3">
          {boards.data?.list.map(board => (
            <li key={board.id}>
              <article className="flex aspect-[5/2] flex-col items-start justify-between gap-3 rounded-2xl border p-4">
                {board.name}
                <Button variant="destructive">Удалить</Button>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export const Component = BoardsListPage;
