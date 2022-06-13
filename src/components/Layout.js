/*
Name: Anant Batgali
Date: 6/13/22
File: Layout.js
Description: 
*/

import {Outlet} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <>
            <Header/>
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;