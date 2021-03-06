/*
Name: Anant Batgali
Date: 6/13/22
File: routes.js
Description: 
*/

import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/home";
import NoMatch from "../pages/nomatch";
import Books from "../pages/book/books";
import Book from "../pages/book/book";
import {AuthProvider} from "../services/useAuth";
import Signin from "../pages/auth/signin";
import Signout from "../pages/auth/signout";
import Signup from "../pages/auth/signup";
import Authors from "../pages/author/authors";
import RequireAuth from "../components/RequireAuth";
import Publishers from "../pages/publisher/publishers";
import EditPublisher from "../pages/publisher/editPublisher";
import Genres from "../pages/genre/genres";


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="books" element={
                        <RequireAuth>
                            <Books/>
                        </RequireAuth>
                    }>
                        <Route index element={<p>Select a book to view details.</p>}/>
                        <Route path=":bookId" element={<Book/>}>
                            <Route path="authors" element={<Authors />}/>
                        </Route>
                    </Route>
                    <Route path="publishers" element={
                        <RequireAuth>
                            <Publishers />
                        </RequireAuth>
                    }>
                        <Route path=":publisher_id" element={<EditPublisher />} />
                    </Route>
                    <Route path="genres" element={ <RequireAuth>
                        <Genres /> </RequireAuth>
                    }></Route>
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