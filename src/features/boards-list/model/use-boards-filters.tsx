import { useState } from 'react';

export type BoardsSortOption =
  | 'createdAt'
  | 'updatedAt'
  | 'lastOpenedAt'
  | 'name';

export type BoardsFiltersParams = {
  search?: string;
  sort: BoardsSortOption;
};

export function useBoardsFilters() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<BoardsSortOption>('lastOpenedAt');

  return {
    search,
    setSearch,
    sort,
    setSort
  };
}
