import React from 'react';
import classes from "./CompletedList.module.scss"
import CompletedTodo from "./CompletedTodo";
import IToDo from "../../interfaces/IToDo";

interface CompletedListProps {
    completedTasks: Array<IToDo> | undefined

    onDelete(value: IToDo): void

    onCompletedChange(value: IToDo): void
}

const CompletedList = ({completedTasks, onCompletedChange, onDelete}: CompletedListProps) => {
    return (
        <div className={classes.list}>

            <div className={classes.title}>
                <h1>{completedTasks ? `Completed (${completedTasks.length})` : ""}</h1>
            </div>

            {completedTasks
                ? completedTasks.map(task => {
                    return <CompletedTodo
                        task={task}
                        onDelete={() => onDelete(task)}
                        onCompletedChange={() => onCompletedChange(task)}
                        key={task.id}
                    />
                })
                : null
            }

        </div>
    );
};

export default CompletedList;