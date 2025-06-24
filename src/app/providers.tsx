import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/shared/api';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
