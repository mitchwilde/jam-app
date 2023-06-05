import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import Memo from "../components/Memo";
import { Memo as MemoModel } from "../models/memo";
import * as MemosApi from "../network/memos_api";
import styles from "../styles/MemosPage.module.css";
import styleUtils from "../styles/utils.module.css";
import AddEditMemoDialog from "./AddEditMemoDialog";


const MemosPageLoggedInView = () => {
    const [memos, setMemos] = useState<MemoModel[]>([]);
    const [memosLoading, setMemosLoading] = useState(true);
    const [showMemosLoadingError, setShowMemosLoadingError] = useState(false);

    const [showAddMemoDialog, setShowAddMemoDialog] = useState(false);
    const [memoToEdit, setMemoToEdit] = useState<MemoModel | null>(null);

    useEffect(() => {
        async function loadMemos() {
            try {
                setShowMemosLoadingError(false);
                setMemosLoading(true);
                const memos = await MemosApi.fetchMemos();
                setMemos(memos);
            } catch (error) {
                console.error(error);
                setShowMemosLoadingError(true);
            } finally {
                setMemosLoading(false);
            }
        }
        loadMemos();
    }, []);

    async function deleteMemo(memo: MemoModel) {
        try {
            await MemosApi.deleteMemo(memo._id);
            setMemos(memos.filter((existingMemo) => existingMemo._id !== memo._id));
        } catch (error) {
            console.error(error);
        }
    }

    const memosGrid = (
        <Row xs={1} md={2} xl={3} className={`mt-4 g-4 ${styles.memosGrid}`}>
            {memos.map((memo) => (
                <Col key={memo._id}>
                    <Memo
                        memo={memo}
                        className={styles.memo}
                        onMemoClicked={setMemoToEdit}
                        onDeleteMemoClicked={deleteMemo}
                    />
                </Col>
            ))}
        </Row>
    );

    return (
        <>
            {memosLoading && <Spinner animation="border" variant="primary" />}
            {showMemosLoadingError && <p>Something went wrong. Please refresh the page.</p>}
            {!memosLoading && !showMemosLoadingError && (
                <>
                    {
                        memos.length > 0
                            ? memosGrid
                            : <p>You don't have any memos yet</p>
                    }
                </>
            )}
            <Button
                className={`mt-4 mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
                onClick={() => setShowAddMemoDialog(true)}
            >
                <FaPlus />
                Add new memo
            </Button>
            {showAddMemoDialog && (
                <AddEditMemoDialog
                    onDismiss={() => setShowAddMemoDialog(false)}
                    onMemoSaved={(newMemo) => {
                        setMemos([...memos, newMemo]);
                        setShowAddMemoDialog(false);
                    }}
                />
            )}
            {memoToEdit && (
                <AddEditMemoDialog
                    memoToEdit={memoToEdit}
                    onDismiss={() => setMemoToEdit(null)}
                    onMemoSaved={(updatedMemo) => {
                        setMemos(
                            memos.map((existingMemo) =>
                                existingMemo._id === updatedMemo._id ? updatedMemo : existingMemo
                            )
                        );
                        setMemoToEdit(null);
                    }}
                />
            )}
        </>
    );
}

export default MemosPageLoggedInView;