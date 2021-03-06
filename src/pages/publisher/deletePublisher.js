/*
Name:Emma Parker
Date: 06-18-2022
File: deletePublisher.js
Description: creates courses component to delete a publisher
*/

import {useState, useEffect} from "react";
import UseFetch from "../../services/useFetch";
import {Button, Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import JSONPretty from "react-json-pretty";

const DeletePublisher =
    ({showModal, setShowModal, data, reload, setReload, setSubHeading}) => {
    const {error, isLoading, data: response, remove} = UseFetch();
    const [showButton, setShowButton] = useState(true);
    const navigate = useNavigate();

    const handleDelete = () => {
        remove(data.id);
        setShowButton(false);
    }
    const handleCancel = () => {
        setShowModal(false);
        setSubHeading("All Publishers");
        navigate("/publishers");
    }
    const handleClose = () => {
        setShowModal(false);
        setShowButton(true);
        setReload(!reload);
        setSubHeading("All Publishers");
        navigate("/publishers");
    }
    return (
        <>
            <Modal show={showModal} onHide={handleClose} centered animation={false} backdrop="static">
                <Modal.Header closeButton>
                    <h4>Delete Publisher</h4>
                </Modal.Header>
                <Modal.Body>
                    {error && <JSONPretty data={error} style={{color: "red"}}></JSONPretty>}
                    {isLoading &&
                        <div className="image-loading">
                            Please wait while data is being loaded
                            <img src={require(`../loading.gif`)} alt="Loading ......"/>
                        </div>
                    }
                    {response
                        ? <JSONPretty data={response}></JSONPretty>
                        : <div>
                            <span style={{color: "red"}}>Are you sure you want to delete the following publisher?</span>
                            <span><JSONPretty data={data} ></JSONPretty></span>
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer style={{justifyContent: "center"}}>
                    <Button variant="danger" onClick={handleDelete}
                            style={{display: (!showButton) ? "none" : ""}}>Remove</Button>
                    <Button variant="secondary" onClick={handleCancel}
                            style={{display: (!showButton) ? "none" : ""}}>Cancel</Button>
                    <Button variant="primary" onClick={handleClose}
                            style={{display: (!showButton) ? "" : "none"}}>Close</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default DeletePublisher;