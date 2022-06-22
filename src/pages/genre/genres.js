/*
Name:Emma Parker
Date: 06-21-2022
File: genres.js
Description: creates genres component to display all the genres
*/

import {settings} from "../../config/config";
import {useAuth} from "../../services/useAuth";
import useAxios from "../../services/useAxios";
import {NavLink} from "react-router-dom";
import {useState, useEffect} from "react";

import "./genre.css";



const Genres = () => {
    const url = settings.baseApiUrl + "/genres";
    const {user} = useAuth();


    //declare the data fetching function
    const {
        error,
        isLoading,
        data: genres
    } = useAxios(url, "GET", {Authorization: "Bearer " + user.jwt});
    return (
        <>
            <div className="main-heading">
                <div className="container">Genre</div>
            </div>
            <div className="sub-heading">
                <div className="container">All Genres</div>
            </div>
            <div className="main-content container">
                {error && <div>{error}</div>}
                {isLoading &&
                    <div className="image-loading">
                        Please wait while data is being loaded
                        <img src={require(`../loading.gif`)} alt="Loading ......"/>
                    </div>
                }
                {genres &&
                    <div className="course-container">
                        <div className="course-row course-row-header">
                            <div>Fiction/Non-fiction</div>
                            <div>Genre Name</div>
                        </div>
                        {genres.data && genres.data.map((genre) => (
                            <div key={genre.genreID} className="class-row">
                                <div>{genre.genreID}</div>
                                <div>{genre.fiction_nonfiction}</div>
                                <div>{genre.genre_name}</div>
                            </div>
                        ))}
                    </div>}
            </div>
        </>
    );
};

export default Genres;