import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";


const MainLayout = () => {
    return (
        <div>
            <nav><Navbar/></nav>
            <main><Outlet/></main>
            <footer><Footer/></footer>
        </div>
    );
};

export default MainLayout;