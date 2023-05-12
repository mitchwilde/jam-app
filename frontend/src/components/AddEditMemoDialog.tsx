import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Memo } from "../models/memo";
import { MemoInput } from "../network/memos_api";
import * as MemosApi from "../network/memos_api";


interface AddEditMemoDialogProps {
    memoToEdit?: Memo,
    onDismiss: () => void,
    onMemoSaved: (memo: Memo) => void,
}

const AddEditMemoDialog = ({ memoToEdit, onDismiss, onMemoSaved }: AddEditMemoDialogProps) => {

    const {register, handleSubmit, formState: { errors, isSubmitting }} = useForm<MemoInput>({ 
        defaultValues: {
            title: memoToEdit?.title || "",
            text: memoToEdit?.text || "",
        }
     });

    async function onSubmit(input: MemoInput) {
        try {
            let memoResponse: Memo;
            if (memoToEdit) {
                memoResponse = await MemosApi.updateMemo(memoToEdit._id, input);
            } else {
                memoResponse = await MemosApi.createMemo(input);
            }
            onMemoSaved(memoResponse);
        } catch (error) {
            console.error(error);
        }
    }

    return ( 
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {memoToEdit ? "Edit Memo" : "Add Memo"}
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <Form id="addEditMemoForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            isInvalid={!!errors.title}
                            {...register("title", { required: "Required" })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Text"
                            {...register("text")}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    type="submit"
                    form="addEditMemoForm"
                    disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>

       </Modal>
    );
}
 
export default AddEditMemoDialog;