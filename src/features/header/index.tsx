import { LogOut } from 'lucide-react';

import { useSession } from '@/shared/model';
import { Avatar, Button, Separator, Tooltip } from '@/shared/ui';

export function AppHeader() {
  const { session, logout } = useSession();

  if (!session) {
    return null;
  }

  return (
    <header className="border-b border-b-amber-100 bg-amber-50 py-4">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">MiroApp</h1>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">
                  {session.email}
                </span>
                <Avatar.Root>
                  <Avatar.Fallback className="border border-amber-200 bg-amber-100 text-amber-700">
                    UV
                  </Avatar.Fallback>
                </Avatar.Root>
              </div>
              <Separator.Root className="bg-amber-200" orientation="vertical" />
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Button.Root
                      className="rounded-full border-amber-200 bg-transparent text-amber-700 hover:border-transparent hover:bg-amber-700 hover:text-white"
                      size="icon"
                      variant="outline"
                      onClick={logout}
                    >
                      <LogOut />
                    </Button.Root>
                  </Tooltip.Trigger>
                  <Tooltip.Content>Выйти</Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
