//Author Adam Wright
//Date: 6/14/2022
// File Name: books.js
//Project Name: books-spa
//Author Adam Wright
//Date: 6/14/2022
// File Name: books.js
//Project Name: mycollege-spa


import React from 'react';
import {settings} from "../../config/config";
import {useEffect, useState} from 'react';
import {NavLink, useLocation, Outlet} from "react-router-dom";
import './book.css';
import useXmlHttp from "../../services/useXmlHttp";

const Books = () => {
    const {pathname} = useLocation();
    const [subHeading, setSubHeading] = useState("All Books");
    const url = settings.baseApiUrl + "/books";
    const {
        error,
        isLoading,
        data: books
    } = useXmlHttp(url);

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
                {isLoading &&
                    <div className="image-loading">
                        Please wait while data is being loaded
                        <img src={require(`../loading.gif`)} alt="Loading ......"/>
                    </div>
                }

                {books && <div className="book-container">
                    <div className="book-list">
                        {books.map((book) => (
                            <NavLink key={book.id}
                                     className={({isActive}) => isActive ? "active" : ""}
                                     to={`/books/${book.id}`}>
                                <span>&nbsp;</span><div>{book.title}</div>
                            </NavLink>
                        ))}
                    </div>
                    <div className="book-item">
                        <Outlet context={[subHeading, setSubHeading]}/>
                    </div>
                </div>}
            </div>
        </>
    );
};

export default Books;