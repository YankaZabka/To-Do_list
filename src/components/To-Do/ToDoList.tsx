import React from 'react';
import classes from "./ToDoList.module.scss"
import ToDo from "./ToDo";
import IToDo from "../../interfaces/IToDo";

interface ToDoListProps {
    currentTask: string

    onCurrentChange(value: string): void

    onAdd(): void

    tasks: Array<IToDo> | undefined
}

const ToDoList = ({onAdd, currentTask, onCurrentChange, tasks}: ToDoListProps) => {
    return (
        <div className={classes.ToDoList}>

            <div className={classes.ToDoHeader}>
                <input
                    type="text"
                    placeholder="  + Add a task, press Enter to save"
                    value={currentTask}
                    onChange={(e) => onCurrentChange(e.target.value)}
                />
                <div
                    className={classes.AddBtn}
                    onClick={() => currentTask.length === 0 ? null : onAdd()}
                >Add
                </div>
            </div>

            {tasks
                ? <>
                    <div className={classes.ToDoCounters}>
                        <div className={classes.totalAmount}>Total: {tasks.length}</div>
                        <div className={classes.todoAmount}>To do: 3</div>
                        <div className={classes.completedAmount}>Completed: 4</div>
                    </div>

                    <div className={classes.ToDoTitle}>To do {tasks.length}</div>
                </>
                : null
            }

            {tasks
                ? tasks.map(task => {
                    return <ToDo
                        taskText={task.title}
                        key={task.id}
                    />
                })
                : null
            }

        </div>
    );
};

export default ToDoList;