import React from 'react';
import classes from "./ToDoList.module.scss"
import ToDo from "./ToDo";
import IToDo from "../../interfaces/IToDo";

interface ToDoListProps {
    currentTask: string

    onCurrentChange(value: string): void

    onAdd(): void

    onCopy(value: IToDo): void

    onDelete(value: IToDo): void

    tasks: Array<IToDo> | undefined
    completedTasks: Array<IToDo> | undefined
}

const ToDoList = ({onAdd, onCopy, onDelete, currentTask, onCurrentChange, tasks, completedTasks}: ToDoListProps) => {
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

            {tasks && tasks.length
                ? <>
                    <div className={classes.ToDoCounters}>
                        <div
                            className={classes.totalAmount}>Total: {tasks.length + (completedTasks ? completedTasks.length : 0)}</div>
                        <div className={classes.todoAmount}>To do: {tasks.length}</div>
                        {completedTasks
                            ? <div className={classes.completedAmount}>Completed: {completedTasks.length}</div>
                            : null
                        }
                    </div>

                    <div className={classes.ToDoTitle}>To do {tasks.length}</div>
                </>
                : null
            }

            {tasks
                ? tasks.map(task => {
                    return <ToDo
                        taskText={task.title}
                        onCopy={() => onCopy(task)}
                        onDelete={() => onDelete(task)}
                        key={task.id}
                    />
                })
                : null
            }

        </div>
    );
};

export default ToDoList;