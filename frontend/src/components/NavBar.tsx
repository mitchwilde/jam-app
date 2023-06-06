import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { User } from "../models/user";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";

//import styles from '../styles/NavBar.module.css';
//import {Nav, NavItem, Navbar, NavDropdown, Dropdown, Button, Container} from 'react-bootstrap';


interface NavBarProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
}

const NavBar = ({ loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful }: NavBarProps) => {
    return (
        <Navbar className="jamTheme" variant="dark" expand="sm" sticky="top" collapseOnSelect={true}>
            <Container>
                <Navbar.Brand >
                    <Nav.Link eventKey={1} as={Link} to="/">
                        Jam App
                    </Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    {loggedInUser &&
                        <>
                        <Nav>
                            <Nav.Link eventKey={2} as={Link} to="/memos">
                                My Memos
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link eventKey={3} as={Link} to="/calendar">
                                Calendar
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link eventKey={4} as={Link} to="/chat">
                                Chat
                            </Nav.Link>
                        </Nav>
                        </>
                    }
                    <Nav className="ms-auto">
                        {loggedInUser
                            ? <NavBarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful} />
                            : <NavBarLoggedOutView onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;