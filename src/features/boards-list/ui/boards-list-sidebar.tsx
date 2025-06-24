import { NavLink } from 'react-router';

import { cn } from '@/shared/lib';
import { ROUTES, type Route } from '@/shared/model';

type NavLinkProps = {
  label: string;
  to: Route;
};

const LINKS: NavLinkProps[] = [
  {
    to: ROUTES.BOARDS,
    label: 'Все доски'
  },
  {
    to: ROUTES.BOARDS_FAVORITE,
    label: 'Избранное доски'
  },
  {
    to: ROUTES.BOARDS_RECENT,
    label: 'Последние доски'
  }
];

export function BoardsListSidebar() {
  return (
    <aside className="flex w-[300px] flex-none flex-col gap-2">
      <h2 className="text-muted-foreground text-sm font-medium">Навигация</h2>

      <nav className="w-full rounded-2xl border p-4">
        <ul>
          {LINKS.map(link => (
            <li key={link.to}>
              <NavLink
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 rounded-md p-2 text-sm font-medium',
                    isActive && 'bg-amber-100 text-amber-700'
                  )
                }
                to={link.to}
                end={link.to === ROUTES.BOARDS}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
