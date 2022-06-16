/*
Name: Anant Batgali
Date: 6/15/22
File: book.js
Description: 
*/

import {settings} from "../../config/config";
import useXmlHttp from '../../services/useXmlHttp';
import {useParams, Link, useOutletContext} from "react-router-dom";
import './book.css';

import React from 'react';

const Book = () => {

    const [subHeading, setSubHeading] = useOutletContext();
    const {bookId} = useParams();
    const url = settings.baseApiUrl + "/books/" + bookId; const {
        error, isLoading, data: book
    } = useXmlHttp(url);

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
                    /*<div className="professor-name">{book.title}</div>*/
                    <div className="professor-info">
                        <div><strong>ISBN</strong>: {book.isbn}</div>
                        <div><strong>Description</strong>: {book.description}</div>
                        <div><strong>Publisher</strong>: <Link to="#">Click here to
                            view publisher</Link></div>
                    </div>
                </div>
                <div className="professor-classes">
                    Author(s)
                </div>
            </>}
        </>
    );
};

export default Book;