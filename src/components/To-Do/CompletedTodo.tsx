import React from 'react';
import classes from "./CompletedToDo.module.scss"
import IToDo from "../../interfaces/IToDo";

interface CompletedTodoProps {
    task: IToDo

    onCompletedChange(): void

    onDelete(): void
}

const CompletedTodo = ({task, onCompletedChange, onDelete}: CompletedTodoProps) => {
    return (
        <div className={classes.ToDo}>
            <div className={classes.ToDo__leftSide}>
                <input
                    type="checkbox"
                    id={task.id.toString()}
                    defaultChecked={true}
                    onClick={() => onCompletedChange()}
                />
                <label htmlFor={task.id.toString()}>{task.title}</label>
            </div>
            <div className={classes.ToDo_btns}>
                <div className={classes.deleteBtn}
                    onClick={() => onDelete()}
                />
            </div>

        </div>
    );
};

export default CompletedTodo;