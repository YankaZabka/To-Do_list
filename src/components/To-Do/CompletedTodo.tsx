import React from 'react';
import classes from "./CompletedToDo.module.scss"

interface CompletedTodoProps {
    taskText: string
}

const CompletedTodo = ({taskText}: CompletedTodoProps) => {
    return (
        <div className={classes.ToDo}>
            <div className={classes.ToDo__leftSide}>
                <input type="checkbox" id="checkbox" defaultChecked={true}/>
                <label htmlFor={"checkbox"}>{taskText}</label>
            </div>
            <div className={classes.ToDo_btns}>
                <div className={classes.deleteBtn}/>
            </div>

        </div>
    );
};

export default CompletedTodo;