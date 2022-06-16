/*
Name: Emma Parker
Date: 06-14-2022
File: signout.js
Description: This script creates the sign-out component
 */

import {useAuth} from "../../services/useAuth";
import {useEffect} from 'react'

const Signout = () => {
    const {logout} = useAuth();

    //need to wrap the setState call inside useEffect.
    useEffect(() => {
        logout();
    })
    return (
        <div>
            <div className="main-heading">
                <div className="container">Authorization</div>
            </div>
            <div className="sub-heading">
                <div className="container">Sign Out</div> </div>
            <div className="main-content container">
                Thank you for your visit. You have signed out.
            </div>

        </div>
    );
};

export default Signout;