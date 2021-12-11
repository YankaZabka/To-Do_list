import React from 'react';
import classes from "./ToDo.module.scss";
import IToDo from "../../interfaces/IToDo";

interface ToDoProps {
    task: IToDo

    onCopy(): void

    onDelete(): void

    onCompletedChange(): void
}

const ToDo = ({task, onCopy, onDelete, onCompletedChange}: ToDoProps) => {
    return (
        <div className={classes.ToDo}>
            <div className={classes.ToDo__leftSide}>
                <input
                    type="checkbox"
                    id={task.id.toString()}
                    defaultChecked={false}
                    onClick={() => onCompletedChange()}
                />
                <label htmlFor={task.id.toString()}>{task.title}</label>
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