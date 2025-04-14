import Header from "./Header/Header.tsx";
import Footer from "./Footer/Footer.tsx";
import {Outlet} from "react-router";


function Layout() {
    return (
        <>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}

export default Layout;