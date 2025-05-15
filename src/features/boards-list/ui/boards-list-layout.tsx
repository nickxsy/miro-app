export function BoardsListLayout({
  header,
  filters,
  children
}: {
  header: React.ReactNode;
  filters?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto">
      {header}
      {filters}
      {children}
    </div>
  );
}

export function BoardsListLayoutHeader({
  title,
  descrition,
  actions
}: {
  title: string;
  descrition?: string;
  actions?: React.ReactNode;
}) {
  return (
    <main className="py-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          {descrition && <p className="text-gray-500">{descrition}</p>}
        </div>
        {actions && <div className="flex items-center gap-4">{actions}</div>}
      </div>
    </main>
  );
}

export function BoardsListLayoutFilter({
  sort,
  filters,
  actions
}: {
  sort?: React.ReactNode;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      {filters && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Фильтровать по</span>{' '}
          {filters}
        </div>
      )}
      {sort && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Сортировать по</span> {sort}
        </div>
      )}
      {actions && <div className="ml-auto">{actions}</div>}
    </div>
  );
}

export function BoardsListLayoutContent({
  children,
  isEmpty,
  isPending,
  hasCursor,
  currsorRef,
  isPendingNext
}: {
  children?: React.ReactNode;
  isEmpty?: boolean;
  isPending?: boolean;
  currsorRef?: React.RefObject<HTMLDivElement>;
  isPendingNext?: boolean;
  hasCursor?: boolean;
}) {
  return (
    <div>
      {isPending && <p>Загрузка...</p>}

      {!isPending && children}

      {isEmpty && !isPending && <p>Доски не найдены</p>}

      {hasCursor && (
        <div ref={currsorRef} className="py-8 text-center">
          {isPendingNext && 'Загрузка дополнительных досок...'}
        </div>
      )}
    </div>
  );
}

export function BoardsListLayoutCards({
  children
}: {
  children?: React.ReactNode;
}) {
  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
      {children}
    </ul>
  );
}

export function BoardsListLayoutList({
  children
}: {
  children?: React.ReactNode;
}) {
  return <ul className="flex flex-col gap-2">{children}</ul>;
}
