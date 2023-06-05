import { Button, Navbar, NavItem } from "react-bootstrap";
import { User } from "../models/user";
import * as MemosApi from "../network/memos_api";

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}

const NavBarLoggedInView = ({ user, onLogoutSuccessful }: NavBarLoggedInViewProps) => {

    async function logout() {
        try {
            await MemosApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Navbar.Text className="me-2">
                Signed in as: {user.username}
            </Navbar.Text>
            <NavItem>
                <Button onClick={logout}>Log out</Button>
            </NavItem>
        </>
    );
}

export default NavBarLoggedInView;