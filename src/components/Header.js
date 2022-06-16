/*
Name: Anant Batgali
Date: 6/13/22
File: Header.js
Description: 
*/


//import {useAuth} from "../services/useAuth";
import {NavLink} from "react-router-dom";
import {Navbar, Nav, Container} from "react-bootstrap";
import logo from '../pages/books-logo.png';
import {useAuth} from "../services/useAuth";

//This component creates a React-Bootstrap navbar. https://react-bootstrap.github.io/components/navbar/
const Header = () => {
    const className = ({ isActive }) => isActive ? "nav-link active" : "nav-link";
    const {isAuthed, user} = useAuth();

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <NavLink to="/">
                        <Navbar.Brand><img src={logo} alt="Logo"/>Books-SPA</Navbar.Brand>
                    </NavLink>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/" >Home</Nav.Link>
                            <Nav.Link href="/books" className={className}>Books</Nav.Link>
                            <div className="nav-separator">|</div> {isAuthed
                            ? <NavLink to="/signout" className={className}>Sign out</NavLink>
                            : <NavLink to="/signin" className={className}>Sign in/Sign up</NavLink> }
                        </Nav>
                        {isAuthed && user ? <div className="navbar-name">
                            Welcome {user.name}!</div> : ""}

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;