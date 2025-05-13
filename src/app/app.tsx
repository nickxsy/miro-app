import { Outlet } from 'react-router';

import { AppHeader } from '@/features/header';

function App() {
  return (
    <div>
      <h1>App</h1>
      <AppHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
