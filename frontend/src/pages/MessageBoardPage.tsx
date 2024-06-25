import MessageBoard from "../components/MessageBoard";
import { useUserContext } from "../UserContext";

const MessageBoardPage = () => {
    const { loggedInUser } = useUserContext();
    return (
        <>
        {loggedInUser
            ? <MessageBoard />
            : "Log in to see the message board."
        }
        </>
    );
}

export default MessageBoardPage;


