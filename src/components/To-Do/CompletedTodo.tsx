import React from 'react';
import classes from "./CompletedToDo.module.scss"

const CompletedTodo = () => {
    return (
        <div className={classes.ToDo}>
            <div className={classes.ToDo__leftSide}>
                <input type="checkbox" id="checkbox" defaultChecked={true}/>
                <label htmlFor={"checkbox"}>Add Icon to Dashboard</label>
            </div>
            <div className={classes.ToDo_btns}>
                <div className={classes.deleteBtn}/>
            </div>

        </div>
    );
};

export default CompletedTodo;