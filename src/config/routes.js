/*
Name: Anant Batgali
Date: 6/13/22
File: routes.js
Description: 
*/

import React from 'react';
import {BrowserRouter,Routes,Route}from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/home";
import NoMatch from "../pages/nomatch";


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="*" element={<NoMatch/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;