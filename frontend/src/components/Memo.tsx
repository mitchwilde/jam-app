import styles from "../styles/Memo.module.css";
import styleUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Memo as MemoModel } from "../models/memo";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface MemoProps {
    memo: MemoModel;
    onMemoClicked: (memo: MemoModel) => void;
    onDeleteMemoClicked: (memo: MemoModel) => void;
    className?: string;
}

const Memo = ({ memo, onMemoClicked, onDeleteMemoClicked, className }: MemoProps) => {
    const { title, text, createdAt, updatedAt } = memo;

    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " + formatDate(createdAt);
    }

    return (
        <Card className={`${styles.memoCard} ${className}`} onClick={() => onMemoClicked(memo)}>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title}
                    <MdDelete
                        className="text-muted ms-auto"
                        onClick={(e) => {
                            onDeleteMemoClicked(memo);
                            e.stopPropagation();
                        }}
                    />
                </Card.Title>
                <Card.Text className={styles.memoText}>{text}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
        </Card>
    );
};

export default Memo;
