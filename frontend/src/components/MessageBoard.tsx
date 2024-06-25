import React, { useEffect, useRef, useState } from 'react';
import { Button} from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import styles from "../styles/MessageBoard.module.css";
import messageStyles from "../styles/Message.module.css";
import styleUtils from "../styles/utils.module.css";
import Message from './Message';
const MessageBoard = () => {
    const [position, setPosition] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);

    const isClicked = useRef<boolean>(false);

    const coords = useRef<{
        startX: number,
        startY: number,
        lastX: number,
        lastY: number
    }>({
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0
    })

    const newMessage = React.createElement('div', null, 'Click me!');

    useEffect(() => {
        if (!boxRef.current || !containerRef.current) return;

        const box = boxRef.current;
        const container = containerRef.current;


        const onMouseDown = (e: MouseEvent) => {
            isClicked.current = true;
            coords.current.startX = e.clientX;
            coords.current.startY = e.clientY;
        }

        const onMouseUp = (e: MouseEvent) => {
            isClicked.current = false;
            coords.current.lastX = box.offsetLeft;
            coords.current.lastY = box.offsetTop;
        }

        const onMouseMove = (e: MouseEvent) => {
            if (!isClicked.current) return;

            const nextX = e.clientX - coords.current.startX + coords.current.lastX;
            const nextY = e.clientY - coords.current.startY + coords.current.lastY;

            box.style.top = `${nextY}px`;
            box.style.left = `${nextX}px`;
        }

        box.addEventListener('mousedown', onMouseDown);
        box.addEventListener('mouseup', onMouseUp);
        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseleave', onMouseUp);

        const cleanup = () => {
            box.removeEventListener('mousedown', onMouseDown);
            box.removeEventListener('mouseup', onMouseUp);
            container.removeEventListener('mousemove', onMouseMove);
            container.removeEventListener('mouseleave', onMouseUp);
        }

        return cleanup;
    }, [])
    return (
        <>
        <Button
            className={`mt-4 mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
            onClick={() => newMessage}
            >
            <FaPlus />
            Add new note
        </Button>
        <div ref={containerRef} className={styles.container}>
            <div ref={boxRef} className={messageStyles.cardBody}>
                {<Message
                    note={{ _id: "1234", title: "New Note", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }}
                    onDeleteNoteClicked={() => console.log("delete me!")}/> }
            </div>
        </div>
        </>
    );
}

export default MessageBoard;