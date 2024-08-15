import { Outlet } from "react-router-dom";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Footer/Footer";


const Layout = () => {
    return (
        <div>
           <Navbar></Navbar>
           <div>
            <Outlet></Outlet>
           </div>
           <Footer></Footer>
        </div>
    );
};

export default Layout;