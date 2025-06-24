import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { enableMocking } from '@/shared/api';

import './index.css';
import { AppRouter } from './router.tsx';

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AppRouter />
    </StrictMode>
  );
});
