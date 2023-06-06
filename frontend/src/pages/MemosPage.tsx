import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import MemosPageLoggedInView from "../components/MemosPageLoggedInView";
import MemosPageLoggedOutView from "../components/MemosPageLoggedOutView";
import { User } from "../models/user";
import * as GlobalApi from "../network/global_api";
import styles from "../styles/MemosPage.module.css";

// interface MemosPageProps {
//     loggedInUser: User | null,
// }

const MemosPage = (/*{loggedInUser}: MemosPageProps*/) => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        async function fetchLoggedInUser() {
            try {
                const user = await GlobalApi.getLoggedInUser();
                setLoggedInUser(user);
            } catch (error) {
                console.error(error);
            }
        }
        fetchLoggedInUser();
    }, []);
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


