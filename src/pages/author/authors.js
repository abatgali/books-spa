/*
Name: Anant Batgali
Date: 6/15/22
File: authors.js
Description: 
*/

import {settings} from "../../config/config";
import useXmlHttp from '../../services/useXmlHttp';
import {useParams} from "react-router-dom";
import {useAuth} from "../../services/useAuth";
import './author.css';

import React from 'react';

const Authors = () => {

    const {bookId} = useParams();
    const url = settings.baseApiUrl + "/books/" + bookId + "/authors";

    const {user} = useAuth();

    const {
        error,
        isLoading,
        data: authors
    } = useXmlHttp(url, "GET", {Authorization: "Bearer" + user.jwt});

    return (
        <>
            {error && <div>{error}</div>}
            {isLoading &&
                <div className="image-loading">
                    Please wait while data is being loaded
                    <img src={require(`../loading.gif`)} alt="Loading ......"/>
                </div>}
            {authors && (authors.length === 0
                    ? <p>Authors were not found.</p>
                    : <div className="class-row class-row-header">
                        <div>Author(s)</div>


                    </div>
            )}
            {authors && (
                authors.map((author) => (
                    <div key={author.author_id} className="class-row">
                        <div>{author.firstname} {author.lastname}</div>
                        <div></div>

                    </div>
                ))
            )}
        </>
    );
};

export default Authors;
