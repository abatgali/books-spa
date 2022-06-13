/*
Name: Anant Batgali
Date: 6/13/22
File: Footer.js
Description: 
*/

const Footer = () => {
    const year = new Date().getFullYear();  //determine the current year with JavaScript
    return (
        <footer>
            <div className="container">
                <span>&copy; Books-SPA {year}</span>
            </div>
        </footer>
    );
};

export default Footer;