import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { enableMocking } from '@/shared/api/mocks/index.ts';

import './index.css';
import { AppRouter } from './router.tsx';

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AppRouter />
    </StrictMode>
  );
});
