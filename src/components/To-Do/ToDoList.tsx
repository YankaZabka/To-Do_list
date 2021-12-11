import React, {useState} from 'react';
import classes from "./ToDoList.module.scss"
import ToDo from "./ToDo";
import IToDo from "../../interfaces/IToDo";

interface ToDoListProps {
    currentTask: string

    onCurrentChange(value: string): void

    onAdd(): void

    onCopy(value: IToDo): void

    onDelete(value: IToDo): void

    onEdit(): void

    onCompletedChange(value: IToDo): void

    onEditedTaskIdChange(value: number): void

    tasks: Array<IToDo> | undefined
    completedTasks: Array<IToDo> | undefined
}

const ToDoList = ({onAdd, onCopy, onDelete, onEdit, onEditedTaskIdChange, currentTask, onCurrentChange, onCompletedChange, tasks, completedTasks}: ToDoListProps) => {
    const [inputBtnValue, setInputBtnValue] = useState("Add")

    return (
        <div className={classes.ToDoList}>

            <div className={classes.ToDoHeader}>
                <input
                    type="text"
                    placeholder={`  + ${inputBtnValue} a task, press Enter to save`}
                    value={currentTask}
                    onChange={(e) => onCurrentChange(e.target.value)}
                />
                <div
                    className={classes.InputBtn}
                    onClick={() => {
                        if (currentTask.length === 0) {
                            return
                        } else if (inputBtnValue === "Add") {
                            onAdd()
                        } else {
                            onEdit()
                            setInputBtnValue("Add")
                        }
                    }}
                >
                    {inputBtnValue}
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

                    <div className={classes.ToDoTitle}>To do ({tasks.length})</div>
                </>
                : null
            }

            {tasks
                ? tasks.map(task => {
                    return <ToDo
                        task={task}
                        onCopy={() => {
                            if (inputBtnValue === "Edit") {
                                alert("Сomplete current editing please")
                                return
                            }

                            onCopy(task)
                        }}
                        onDelete={() => {
                            if (inputBtnValue === "Edit") {
                                alert("Сomplete current editing please")
                                return
                            }

                            onDelete(task)
                        }}
                        onEdit={() => {
                            if (inputBtnValue === "Edit") {
                                alert("Сomplete current editing please")
                                return
                            }

                            onCurrentChange(task.title)
                            onEditedTaskIdChange(task.id)
                            setInputBtnValue("Edit")
                        }}
                        onCompletedChange={() => {
                            if (inputBtnValue === "Edit") {
                                alert("Сomplete current editing please")
                                return
                            }

                            onCompletedChange(task)
                        }}
                        key={task.id}
                    />
                })
                : null
            }

        </div>
    );
};

export default ToDoList;