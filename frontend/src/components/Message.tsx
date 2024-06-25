import { Card } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { Message as MessageModel } from "../models/message";
import styles from "../styles/Message.module.css";
import { formatDate } from "../utils/formatDate";

interface MessageProps {
    note: MessageModel;
    onDeleteNoteClicked: (note: MessageModel) => void;
    className?: string;
}

const Message = ({ note, onDeleteNoteClicked, className }: MessageProps) => {
    const { title, text, createdAt, updatedAt } = note;

    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " + formatDate(createdAt);
    }

    return (
        <Card className={`${styles.noteCard} ${className}`}>
            <Card.Body className={styles.cardBody}>
                <Card.Title>
                    {title}
                    <MdDelete
                        className="text-muted ms-auto"
                        onClick={(e) => {
                            onDeleteNoteClicked(note);
                            e.stopPropagation();
                        }}
                    />
                </Card.Title>
                <Card.Text className={styles.noteText}>{text}</Card.Text>
                {createdUpdatedText}
            </Card.Body>
        </Card>
    );
};

export default Message;
