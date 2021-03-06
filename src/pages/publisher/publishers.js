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
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../services/useAuth";
import EditPublisher from "./editPublisher";
import CreatePublisher from "./createPublisher";
import DeletePublisher from "./deletePublisher";
import {Table, Button, Form} from 'react-bootstrap';

import React from 'react';

const Publishers = () => {

    const {error, isLoading, data: publishers, getAll, search} = UseFetch();
    const [subHeading, setSubHeading] = useState("All Publishers");
    const navigate = useNavigate();
    const [activePublisher, setActivePublisher] = useState(""); //the publisher being edited
    const [showEditModal, setShowEditModal] = useState(false);
    const [reload, setReload] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const {user} = useAuth();
    const disabled = (user.role !== 1);

    useEffect(() => {
        getAll();
    }, [reload]);



    const handleSearch = (e) => {
        e.preventDefault();
        const term = document.getElementById("student-search-term").value;
        if(term === '')
            setSubHeading("All Publishers");
        else if(isNaN(term))
            setSubHeading("Publishers containing '" + term + "'");
        else if(!isNaN(term))
            setSubHeading("Publishers whose GPA is >= " + term);
        search(term);
    }

    const clearSearchBox = (e) => {
        e.preventDefault();
        document.getElementById("student-search-term").value = "";
        setSubHeading("All Publishers");
        search("");
    }

    const handleEdit = (e) => {
        if(disabled) return;
        //retrieve publisher data and pass it to the update page
        let publisher = {};
        ["publisher_id", "publisher_name", "address", "website"].forEach(function(key) {
            publisher[key] =
                document.getElementById(`publisher-${key}-` + e.target.id).innerText;
        })
        setActivePublisher(publisher);
        navigate("/publishers/" + e.target.id);
        setShowEditModal(true);
        setSubHeading("Edit Publisher");
    }

    const handleCreate = (e) => {
        if(disabled) return;
        setShowCreateModal(true);
        setSubHeading("Create Publisher");
    }

    const handleDelete = (e) => {
        if(disabled) return;
        let publisher = {};
        ["publisher_id", "publisher_name", "address", "website"].forEach(function (key) {
            publisher[key] =
                document.getElementById(`publisher-${key}-` + e.target.id).innerText;
        })
        setActivePublisher(publisher);
        setSubHeading("Delete Publisher");
        navigate("/publishers/" + e.target.id);
        setShowDeleteModal(true);
    }

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
                <form style={{
                    textAlign: "right",
                    marginBottom: "3px",
                    justifyContent:"left",
                    maxWidth:"40%"
                    }}
                      onSubmit={handleSearch}>
                    <Form.Control type="text"
                                  id="student-search-term"
                                  placeholder="Search publishers"
                                style={{
                                 marginBottom:"1em"
                                }}
                    />
                    <Button type="submit" variant="outline-info"
                            style={{marginLeft: "5px"}}>
                        Search
                    </Button>
                    <Button variant="outline-secondary" style={{marginLeft: "5px"}}
                            onClick={clearSearchBox}>Clear</Button>
                </form>
                <div style={{marginLeft: "auto", marginBottom: "1em"}}>
                    <Button variant="outline-dark" disabled={disabled} onClick={handleCreate}>
                        Create Publisher </Button>
                </div>
                {publishers &&
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th className="publisher-publisher_id">Id</th>
                            <th className="publisher-publisher_name">Name</th>
                            <th className="publisher-address">Address</th>
                            <th className="publisher-website">Website</th>
                            <th className="publisher-actions">Actions</th>
                        </tr>
                        </thead>
                        {publishers.data.map((publisher) => (
                            <tbody className="test">

                                <tr key={publisher.id}>

                                    <td id={"publisher_id-" + publisher.id} className="publisher_id">{publisher.publisher_id}</td>
                                    <td id={"publisher_name-" + publisher.id} className="publisher_name"><strong>{publisher.publisher_name}</strong></td>
                                    <td id={"publisher_address-" + publisher.id} className="address">{publisher.address}</td>
                                    <td id={"publisher_website-" + publisher.id} className="website"><a href={"https://"+publisher.website}>{publisher.website}</a></td>
                                    <td className="actions">
                                        <Button variant="outline-primary" className="button-light" id={publisher.id}
                                                disabled={disabled}
                                                onClick={handleEdit}
                                                style={{marginBottom: "0.5em"}}
                                        >Edit</Button>
                                        <Button variant="outline-danger" className="button-light" id={publisher.id } disabled={disabled}
                                                onClick={handleDelete}>Delete</Button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>}

                        {showEditModal &&
                            <EditPublisher
                            showModal={showEditModal}
                            setShowModal={setShowEditModal}
                            data={activePublisher}
                            reload={reload}
                            setReload={setReload}
                            setSubHeading={setSubHeading}/>}

                        {showDeleteModal &&
                            <DeletePublisher showModal={showDeleteModal} setShowModal={setShowDeleteModal}
                                             data={activePublisher} reload={reload} setReload={setReload}
                                             setSubHeading={setSubHeading}/>}

                        {showCreateModal &&
                            <CreatePublisher
                                showModal={showCreateModal}
                                setShowModal={setShowCreateModal}
                                reload={reload} setReload={setReload}
                                setSubHeading={setSubHeading}/>}
            </div>
        </>
    );
};

export default Publishers;

