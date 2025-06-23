import { StarIcon } from 'lucide-react';

import { cn } from '@/shared/lib';

export function BoardsFavoriteToggle({
  isFavorite,
  onFavoriteToggle,
  className
}: {
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onFavoriteToggle}
      className={cn(
        'rounded-full p-1 transition-colors hover:bg-gray-100',
        className
      )}
    >
      <StarIcon
        className={cn(
          'h-5 w-5',
          isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
        )}
      />
    </button>
  );
}
