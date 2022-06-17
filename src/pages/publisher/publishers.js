/*
Name: Anant Batgali
Date: 6/16/22
File: publishers.js
Description: 
*/

import {useEffect, useState} from 'react';
import UseFetch from "../../services/useFetch";
import JSONPretty from 'react-json-pretty';
import "./publisher.css";

import React from 'react';

const Publishers = () => {

    const {error, isLoading, data: publishers, getAll} = UseFetch();
    const [subHeading, setSubHeading] = useState("All Publishers");
    useEffect(() => {
        getAll();
    }, []);

    return (
        <>
            <div className="main-heading">
                <div className="container">Publisher</div>
            </div>
            <div className="sub-heading">
                <div className="container">{subHeading}</div>
            </div>
            <div className="main-content container">
                {error && <JSONPretty data={error}></JSONPretty>}
                {isLoading &&
                    <div className="image-loading">
                        Please wait while data is being loaded
                        <img src={require(`../loading.gif`)} alt="Loading ......"/>
                    </div>}
                {publishers &&
                    <div className="student-container">
                        <div className="student-row student-row-header">
                            <div className="student-info">
                                <div className="student-id">Id</div>
                                <div className="student-name">Name</div>
                                <div className="student-email">Address</div>
                                <div className="student-major">Website</div>
                            </div>
                            <div className="student-buttons" style={{textAlign: "center"}}>Actions</div>
                        </div>
                        {publishers.data.map((publisher) => (
                            <div key={publisher.publisher_id} className="student-row">
                                <div className="student-info">
                                    <div id={"student-id-" + publisher.publisher_id} className="student-id">{publisher.publisher_id}</div>
                                    <div id={"student-name-" + publisher.publisher_id} className="student-name">{publisher.publisher_name}</div>
                                    <div id={"student-email-" + publisher.publisher_id} className="student-email">{publisher.address}</div>
                                    <div id={"student-major-" + publisher.publisher_id} className="student-major"><a href={"https://"+publisher.website}>{publisher.website}</a></div>
                                </div>
                                <div className="student-buttons">
                                    <button className="button-light" id={publisher.publisher_id}>Edit</button>
                                    <button className="button-light" id={publisher.publisher_id}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>}
            </div>
        </>
    );
};

export default Publishers;

