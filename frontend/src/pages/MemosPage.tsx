import { Container } from "react-bootstrap";
import MemosPageLoggedInView from "../components/MemosPageLoggedInView";
import MemosPageLoggedOutView from "../components/MemosPageLoggedOutView";
import { User } from "../models/user";
import styles from "../styles/MemosPage.module.css";

interface MemosPageProps {
    loggedInUser: User | null,
}

const MemosPage = ({loggedInUser}: MemosPageProps) => {
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


