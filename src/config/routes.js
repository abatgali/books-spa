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
import Books from "../pages/book/books";
import {AuthProvider} from "../services/useAuth";
import Signin from "../pages/auth/signin";
import Signout from "../pages/auth/signout";
import Signup from "../pages/auth/signup";
import Book from "../pages/book/book";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/books" element={<Books/>}>
                        <Route index element={<p>Select a book to view details.</p>}/>
                        <Route path=":bookId" element={<Book/>} />
                    </Route>
                    <Route path="/signin" element={<Signin/>}/>
                    <Route path="/signout" element={<Signout/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="*" element={<NoMatch/>}/>
                </Route>
            </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default AppRoutes;