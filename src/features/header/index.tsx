import { LogOut } from 'lucide-react';

import { useSession } from '@/shared/model';
import { Avatar, AvatarFallback } from '@/shared/ui/kit/avatar';
import { Button } from '@/shared/ui/kit/button';
import { Separator } from '@/shared/ui/kit/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/shared/ui/kit/tooltip';

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
                <Avatar>
                  <AvatarFallback className="border border-amber-200 bg-amber-100 text-amber-700">
                    UV
                  </AvatarFallback>
                </Avatar>
              </div>
              <Separator className="bg-amber-200" orientation="vertical" />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="rounded-full border-amber-200 bg-transparent text-amber-700 hover:border-transparent hover:bg-amber-700 hover:text-white"
                      size="icon"
                      variant="outline"
                      onClick={logout}
                    >
                      <LogOut />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Выйти</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
