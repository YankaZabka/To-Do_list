import React from 'react';
import classes from "./ToDo.module.scss";

interface ToDoProps {
    taskText: string

    onCopy(): void

    onDelete(): void

    onCompletedChange(): void
}

const ToDo = ({taskText, onCopy, onDelete, onCompletedChange}: ToDoProps) => {
    return (
        <div className={classes.ToDo}>
            <div className={classes.ToDo__leftSide}>
                <input
                    type="checkbox"
                    id="checkbox"
                    defaultChecked={false}
                    onClick={() => onCompletedChange()}
                />
                <label htmlFor={"checkbox"}>{taskText}</label>
            </div>
            <div className={classes.ToDo_btns}>
                <div className={classes.editBtn} />
                <div className={classes.copyBtn}
                     onClick={() => onCopy()}
                />
                <div className={classes.deleteBtn}
                     onClick={() => onDelete()}
                />
            </div>
        </div>
    );
};

export default ToDo;