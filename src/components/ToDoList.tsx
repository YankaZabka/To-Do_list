import React from 'react';
import classes from "./ToDoList.module.scss"
import ToDo from "./ToDo";

const ToDoList = () => {
    return (
        <div className={classes.ToDoList}>

            <div className={classes.ToDoHeader}>
                <input
                    type="text"
                    placeholder="  + Add a task, press Enter to save"
                />
                <div className={classes.AddBtn}>Add</div>
            </div>

            <div className={classes.ToDoCounters}>
                <div className={classes.totalAmount}>Total: 7</div>
                <div className={classes.todoAmount}>To do: 3</div>
                <div className={classes.completedAmount}>Completed: 4</div>
            </div>

            <div className={classes.ToDoTitle}>To do (3)</div>

            <ToDo/>
            <ToDo/>
            <ToDo/>



        </div>
    );
};

export default ToDoList;