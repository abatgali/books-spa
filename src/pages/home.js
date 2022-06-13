/*
Name: Anant Batgali
Date: 06/11/2022
File: home.js
Description: create the home page
*/

const Home = () => {
    return (
        <>
            <div className="main-heading">
                <div className="container">Home</div>
            </div>
            <div className="sub-heading">
                <div className="container">Welcome to Books Single Page Application</div>
            </div>
            <div className="main-content container">

                <p>This application is an API client. Data of the application is provided by a API service called <strong>Books API</strong>.
                    <br/>The application uses four common HTTP methods for CRUD operations: <strong>GET, POST, PUT, and DELETE</strong>.
                </p>

                <p>Please sign in or create a new account to view resources.</p>
            </div>
        </>
    );
};

export default Home;