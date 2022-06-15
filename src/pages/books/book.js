//Author Adam Wright
//Date: 6/14/2022
// File Name: book.js
//Project Name: mycollege-spa
import React from 'react';
import {settings} from "../../config/config";
import useXmlHttp from '../../services/useXmlHttp';
import {useParams, Link, useOutletContext} from "react-router-dom";
import './book.css';

const Book = () => {
    const [subheading, setSubHeading] = useOutletContext();
    const {bookID} = useParams();
    const url = settings.baseApiUrl + "/books/" + bookID;
    const {
        error,
        isLoading,
        data: book
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
                <div className="book-details">
                    <div className="book-name">{book.title}</div>
                    <div className="book-info">
                        <div><strong>Title</strong>: {book.title}</div>
                        <div><strong>Genre</strong>: {book.genreid}</div>
                        <div><strong>ISBN</strong>: {book.isbn}</div>
                        <div><strong>Price</strong>: {book.price}</div>
                        <div><strong>Description</strong>: {book.description}</div>
                        <div><strong>Publisher</strong>: {book.publisher}</div>
                        <div><strong>Rating</strong>: {book.ratingid}</div>
                        {/*<div><strong>Profile</strong>:<a href={book.url} target="_blank">Click here to view profile</a></div>*/}
                        <div><strong>Authors</strong>: <Link to="#">Click here to
                            view Author</Link></div>
                    </div>
                    <div className="book-photo">
                        <img src={book.image} alt={book.name} id={book.id}/>
                    </div>
                </div>

            </>}
        </>
    );
};

export default Book;