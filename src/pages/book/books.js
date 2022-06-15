/*
Name: Anant Batgali
Date: 6/15/22
File: books.js
Description: 
*/

import {settings} from "../../config/config";
import {useState, useEffect} from 'react';
import {NavLink, useLocation} from "react-router-dom"; import './book.css';


import React from 'react';

const Books = () => {

    const {pathname} = useLocation();
    const [subHeading, setSubHeading] = useState("All Books");
    const url = settings.baseApiUrl + "/books";
    const [books, setBooks] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.timeout = 2000; // time in milliseconds
        request.onload = () => { // Request finished. setIsLoading (false)
            if (request.status === 200) {
                setBooks(JSON.parse(request.response)); } else {
                setError("Status: " + request.status + "; Error: " + request.statusText); }
        }
        request.ontimeout = () => { // Request timed out.
            setIsLoading (false);
            setError("Error: The request has timed out."); }
        request.send();
    });
    useEffect(() => {
        setSubHeading("All Books");
    }, [pathname]);

    return (
        <>
            <div className="main-heading">
                <div className="container">Book</div>
            </div>
            <div className="sub-heading">
                <div className="container">{subHeading}</div> </div>
            <div className="main-content container">
                {error && <div>{error}</div>}
                {isLoading && <div className="image-loading">
                    <img src={require(`../loading.gif`)} alt="Loading ......"/>
                    </div>}
                {books && <div className="professor-container">
                    <div className="professor-list">
                        {books.map((book) => (
                            <NavLink key={book.id} className={({isActive}) => isActive ? "active" : ""} to="#" >
                                <span>&nbsp;</span>
                                <div>{book.title}</div>
                            </NavLink>
                            ))}
                    </div>
                    <div className="professor-item">
                        Book details
                    </div>
                </div>}
            </div>
        </>
    );
};

export default Books;