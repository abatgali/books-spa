/*
Name:Emma Parker
Date: 06-18-2022
File: editPublisher.js
Description: creates courses component to edit publisher information
*/

import {useState, useEffect} from "react";
import UseFetch from "../../services/useFetch";
import {useNavigate} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import JSONPretty from "react-json-pretty";
import "./publisher.css";


const EditPublisher =
    ({showModal, setShowModal, data, reload, setReload, setSubHeading}) => {
        const {error, isLoading, data: response, update} = UseFetch();
        const navigate = useNavigate();
        const [submitted, setSubmitted] = useState(false);
        const [showButton, setShowButton] = useState(true);


        const {register, handleSubmit, formState: {errors}} = useForm({
            defaultValues: data,
            shouldUseNativeValidation: false
        });

        const editFormOptions = {
            publisher_id: {required: "ID is required"},
            publisher_name: {required: "Name is required"},
            address: {required: "Address is required"},
            website: {required: "Website is required"},
        }
        const handleUpdate = (publisher) => {
            update(publisher);
            setSubmitted(true);
        }
        const handleCancel = () => {
            setShowModal(false);
            setSubHeading("All Publishers");
            navigate("/publishers")
        }
        const handleClose = () => {
            setShowModal(false);
            setShowButton(true);
            setSubmitted(false);
            setReload(!reload);
            setSubHeading("All Publishers");
            navigate("/publishers")
        }
        useEffect(() => {
            if (!submitted || error != null) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        })
        return (
            <>
                <Modal show={showModal} onHide={handleClose} centered animation={false} backdrop="static">
                    <Modal.Header closeButton>
                        <h4>Edit Publisher</h4>
                    </Modal.Header>
                    <Modal.Body>
                        {error && <JSONPretty data={error} style={{color: "red"}}></JSONPretty>}
                        {isLoading &&
                            <div className="image-loading">
                                Please wait while data is being loaded
                                <img src={require(`../loading.gif`)} alt="Loading ......"/>
                            </div>
                        }
                        {response && <JSONPretty data={response}></JSONPretty>}
                        {(!submitted || error != null) &&
                            <form className="form-publisher" id="form-publisher-edit" onSubmit={handleSubmit(handleUpdate)}>
                                <ul className="form-publisher-errors">
                                    {errors?.publisher_id && <li>{errors.publisher_id.message}</li>}
                                    {errors?.publisher_name && <li>{errors.publisher_name.message}</li>}
                                    {errors?.address && <li>{errors.address.message}</li>}
                                    {errors?.website && <li>{errors.website.message}</li>}
                                </ul>
                                <div className="form-group">
                                    <label>Publisher ID</label>
                                    <input name="publisher_id" readOnly="readOnly" {...register('publisher_id', editFormOptions.publisher_id)}/>
                                </div>
                                <div className="form-group">
                                    <label>Publisher Name</label>
                                    <input type="text" name="publisher_name" {...register('publisher_name', editFormOptions.publisher_name)}/>
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input name="address" {...register('address', editFormOptions.address)}/>
                                </div>
                                <div className="form-group">
                                    <label>Website</label>
                                    <input name="website" {...register('website', editFormOptions.website)}/>
                                </div>
                            </form>}
                    </Modal.Body>
                    <Modal.Footer style={{justifyContent: "center"}}>
                        <Button type="submit" form="form-publisher-edit" variant="primary"
                                style={{display: (!showButton) ? "none" : ""}}>Update</Button>
                        <Button variant="secondary" onClick={handleCancel}
                                style={{display: (!showButton) ? "none" : ""}}>Cancel</Button>
                        <Button variant="primary" onClick={handleClose}
                                style={{display: (!showButton) ? "" : "none"}}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </>
        );
    };

export default EditPublisher;