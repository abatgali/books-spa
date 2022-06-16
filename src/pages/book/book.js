/*
Name: Anant Batgali
Date: 6/15/22
File: book.js
Description: 
*/

import {settings} from "../../config/config";
import useXmlHttp from '../../services/useXmlHttp';
import {useParams, Link, useOutletContext, Outlet} from "react-router-dom";
import './book.css';
import {useAuth} from "../../services/useAuth";


import React from 'react';

const Book = () => {

    const [subHeading, setSubHeading] = useOutletContext();
    const {bookId} = useParams();
    const url = settings.baseApiUrl + "/books/" + bookId;
    const {user} = useAuth();

    const {
        error,
        isLoading,
        data: book
    } = useXmlHttp(url, /*"GET",{Authorization: `Bearer ${user.jwt}`} */);

    return (


        <>
            {error && <div>{error}</div>}
            {isLoading &&
                <div className="image-loading">
                    Please wait while data is being loaded
                    <img src={require(`../loading.gif`)} alt="Loading ......"/>
                </div>}
            {book && <>
                {setSubHeading(book.title)}
                <div className="professor-details">
                    <div className="professor-name">{book.title}</div>
                    <div className="professor-info">
                        <div> <img src={book.image}/></div>
                        <div><strong>ISBN</strong>: {book.isbn}</div>
                        <div><strong>Description</strong>: {book.description}</div>
                        <div><strong>Rating</strong>: {book.rating.rating}</div>
                        <div><strong>Price</strong>: ${ book.price}</div>
                        <Link to={`/books/${book.book_id}/authors`}> Click here to view author(s).</Link>

                    </div>
                </div>
                <div className="professor-classes">
                    <Outlet/>
                </div>
            </>}
        </>
    );
};

export default Book;