import { Outlet } from 'react-router-dom'
import Header from '../../components/Header';


const Layout = ({children}) => {
    return (
        <>
        <header>
             <Header/>
        </header>
        <main>
            <section>

            </section>
            <Outlet/>
        </main>
        <footer>

        </footer>
        </>
    );
};

export default Layout;