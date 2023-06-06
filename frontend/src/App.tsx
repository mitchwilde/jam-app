import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as GlobalApi from "./network/global_api"
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import SignUpModal from "./components/SignUpModal";
import { User } from "./models/user";
import MemosPage from "./pages/MemosPage";
import NotFoundPage from "./pages/NotFoundPage";
import ChatPage from "./pages/ChatPage";
import styles from "./styles/app.module.css";
import HomePage from "./pages/HomePage";
import CalendarPage from "./pages/CalendarPage";
import { UnauthorizedError } from "./errors/http_errors";



function App() {

    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    useEffect(() => {
        async function fetchLoggedInUserQuiet() {
            try {
                const user = await GlobalApi.getLoggedInUserQuiet();
                setLoggedInUser(user);
            } catch (error) {
                if (error instanceof UnauthorizedError) {
                    console.info(error.message);
                } else {
                    console.error(error);
                }
            }
        }
        fetchLoggedInUserQuiet();
    }, []);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLogInModal, setShowLogInModal] = useState(false);

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
                        element={<HomePage/>}
                        />
                        <Route
                        path='/memos'
                        element={<MemosPage /*loggedInUser={loggedInUser}*/ />}
                        />
                        <Route
                        path='/chat'
                        element={<ChatPage/>}
                        />
                         <Route
                        path='/calendar'
                        element={<CalendarPage/>}
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
