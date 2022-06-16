/*
Name: Anant Batgali
Date: 6/15/22
File: books.js
Description: 
*/

import {settings} from "../../config/config";
import {useState, useEffect} from 'react';
import {NavLink, useLocation, Outlet} from "react-router-dom"; import './book.css';
import useXmlHttp from "../../services/useXmlHttp";
import {useAuth} from "../../services/useAuth";
import Pagination from "./pagination";

import React from 'react';

const Books = () => {

    //const {user} = useAuth();
    const {pathname} = useLocation();
    const [subHeading, setSubHeading] = useState("All Books");
    const url = settings.baseApiUrl + "/books";
    const {
        error,
        isLoading,
        data: books
    } = useXmlHttp(url, /*"GET", {Authorization: `Bearer ${user.jwt}`}*/);

    useEffect(() => {
        setSubHeading("All Books");
    }, [pathname]);

    return (
        <>
            <div className="main-heading">
                <div className="container">Book</div>
            </div>
            <div className="sub-heading">
                <div className="container">{subHeading}</div>
            </div>
            <div className="main-content container">
                {error && <div>{error}</div>}
                {isLoading && <div className="image-loading">
                    <img src={require(`../loading.gif`)} alt="Loading ......"/>
                    </div>}
                {books && <div className="professor-container">
                    <div className="professor-list">
                        {books.map((book) => (
                            <NavLink key={book.book_id} className={({isActive}) => isActive ? "active" : ""} to={`/books/${book.book_id}`} >
                                <span>&nbsp;</span>
                                <div>{book.title}</div>
                            </NavLink>
                            ))}
                    </div>
                    <div className="professor-item">
                        <Outlet context={[subHeading, setSubHeading]} />
                    </div>
                </div>}
            </div>
        </>
    );
};

export default Books;