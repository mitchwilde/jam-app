import { Container } from "react-bootstrap";
import MemosPageLoggedInView from "../components/MemosPageLoggedInView";
import MemosPageLoggedOutView from "../components/MemosPageLoggedOutView";
import styles from "../styles/MemosPage.module.css";
import { useUserContext } from "../UserContext";

const MemosPage = () => {
    const { loggedInUser } = useUserContext();
    return (
        <Container className={styles.memosPage}>
            <>
                {loggedInUser
                    ? <MemosPageLoggedInView />
                    : <MemosPageLoggedOutView />
                }
            </>
        </Container>
    );
}

export default MemosPage;


