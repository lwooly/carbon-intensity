import { Outlet } from 'react-router-dom'
import Header from '../../components/Header';


const Layout = ({children}) => {
    return (
        <>
        <header>
             <Header/>
        </header>
        <main style={{maxWidth: 1536, margin:'auto'}}>
        <Outlet/>
        </main>
        <footer>

        </footer>
        </>
    );
};

export default Layout;