import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import { useUserContext } from "../UserContext";


interface NavBarProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void
}

const NavBar = ({ onSignUpClicked, onLoginClicked }: NavBarProps) => {
    const { loggedInUser } = useUserContext();
    return (
        <Navbar className="jamTheme" variant="dark" expand="sm" sticky="top" collapseOnSelect={true}>
            <Container>
                <Navbar.Brand>
                    <Nav.Link eventKey={1} as={Link} to="/">
                    <img
                        src="/high-five-icon.png"
                        width="32"
                        height="32"
                        className="d-inline-block align-top"
                        alt="Jam high five logo"
                    />{'  '}
                    Jam
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
                                Message Board
                            </Nav.Link>
                        </Nav>
                        </>
                    }
                    <Nav className="ms-auto">
                        {loggedInUser
                            ? <NavBarLoggedInView/>
                            : <NavBarLoggedOutView onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;