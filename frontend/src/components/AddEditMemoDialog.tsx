import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Memo } from "../models/memo";
import { MemoInput } from "../network/memos_api";
import * as MemosApi from "../network/memos_api";
import TextInputField from "./form/TextInputField";


interface AddEditMemoDialogProps {
    memoToEdit?: Memo,
    onDismiss: () => void,
    onMemoSaved: (memo: Memo) => void,
}

const AddEditMemoDialog = ({ memoToEdit, onDismiss, onMemoSaved }: AddEditMemoDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<MemoInput>({
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
                    <TextInputField
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Title"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.title}
                    />

                    <TextInputField
                        name="text"
                        label="Text"
                        as="textarea"
                        rows={5}
                        placeholder="Text"
                        register={register}
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    type="submit"
                    form="addEditMemoForm"
                    disabled={isSubmitting}
                    className="jam-theme"
                >
                    Save
                </Button>
            </Modal.Footer>

        </Modal>
    );
}

export default AddEditMemoDialog;