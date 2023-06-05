import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import SignUpModal from "./components/SignUpModal";
import { User } from "./models/user";
import * as MemosApi from "./network/memos_api";
import MemosPage from "./pages/MemosPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivacyPage from "./pages/PrivacyPage";
import styles from "./styles/app.module.css";


function App() {

    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLogInModal, setShowLogInModal] = useState(false);

    useEffect(() => {
        async function fetchLoggedInUser() {
            try {
                const user = await MemosApi.getLoggedInUser();
                setLoggedInUser(user);
            } catch (error) {
                console.error(error);
            }
        }
        fetchLoggedInUser();
    }, []);

    return (
        <BrowserRouter>
            <div>
                <NavBar
                    loggedInUser={loggedInUser}
                    onLoginClicked={() => setShowLogInModal(true)}
                    onSignUpClicked={() => setShowSignUpModal(true)}
                    onLogoutSuccessful={() => setLoggedInUser(null)}
                />
                <Container className={styles.pageContainer}>
                    <Routes>
                        <Route
                        path='/'
                        element={<MemosPage loggedInUser={loggedInUser}/>}
                        />
                        <Route
                        path='/privacy'
                        element={<PrivacyPage/>}
                        />
                        <Route
                        path='/*'
                        element={<NotFoundPage/>}
                        />
                    </Routes>
                </Container>
                {showSignUpModal &&
                    <SignUpModal
                        onDismiss={() => setShowSignUpModal(false)}
                        onSignUpSuccessful={(user) => {
                            setLoggedInUser(user);
                            setShowSignUpModal(false);
                        }}
                    />
                }
                {showLogInModal &&
                    <LoginModal
                        onDismiss={() => setShowLogInModal(false)}
                        onLoginSuccessful={(user) => {
                            setLoggedInUser(user);
                            setShowLogInModal(false);
                        }}
                    />
                }

            </div>
        </BrowserRouter>
    );
}

export default App;
