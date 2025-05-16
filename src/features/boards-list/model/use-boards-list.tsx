import { keepPreviousData } from '@tanstack/react-query';
import { type RefCallback, useCallback } from 'react';

import { rqClient } from '@/shared/api/instance';

type UseBoardsListParams = {
  limit?: number;
  isFavorite?: boolean;
  sort?: 'createdAt' | 'updatedAt' | 'lastOpenedAt' | 'name';
  search?: string;
};

export function useBoardsList({
  limit = 10,
  isFavorite,
  sort,
  search
}: UseBoardsListParams) {
  const { fetchNextPage, data, isFetchingNextPage, isPending, hasNextPage } =
    rqClient.useInfiniteQuery(
      'get',
      '/boards',
      {
        params: {
          query: {
            page: 1,
            limit,
            isFavorite,
            sort,
            search
          }
        }
      },
      {
        initialPageParam: 1,
        pageParamName: 'page',
        placeholderData: keepPreviousData,
        getNextPageParam: (lastPage, _, lastPageParams) =>
          Number(lastPageParams) < lastPage.totalPages
            ? Number(lastPageParams) + 1
            : null
      }
    );

  const cursorRef: RefCallback<HTMLDivElement> = useCallback(
    el => {
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        {
          threshold: 0.5
        }
      );

      if (el) {
        observer.observe(el);

        return () => {
          observer.disconnect();
        };
      }
    },
    [fetchNextPage]
  );

  const boards = data?.pages.flatMap(page => page.list) ?? [];

  return {
    isFetchingNextPage,
    isPending,
    hasNextPage,
    boards,
    cursorRef
  };
}
