import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

function Layout() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main style={{ maxWidth: 1536, margin: 'auto' }}>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
