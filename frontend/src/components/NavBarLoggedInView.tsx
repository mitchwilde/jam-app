import { Button, Navbar, Nav} from "react-bootstrap";
import * as GlobalApi from "../network/global_api";
import { useUserContext } from "../UserContext";


const NavBarLoggedInView = () => {
    const { loggedInUser } = useUserContext();
    async function logout() {
        try {
            await GlobalApi.logout();
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <Navbar.Text className="me-2">
                Signed in as: {loggedInUser?.username}
            </Navbar.Text>
            <Nav.Item>
                <Button onClick={logout}>Log out</Button>
            </Nav.Item>
        </>
    );
}

export default NavBarLoggedInView;