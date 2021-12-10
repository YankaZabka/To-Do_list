import React from 'react';
import classes from "./CompletedList.module.scss"
import CompletedTodo from "./CompletedTodo";
import IToDo from "../../interfaces/IToDo";

interface CompletedListProps {
    completedTasks: Array<IToDo> | undefined
}

const CompletedList = ({completedTasks}: CompletedListProps) => {
    return (
        <div className={classes.list}>

            <div className={classes.title}>
                <h1>{completedTasks ? `Completed (${completedTasks.length})` : ""}</h1>
            </div>

            {completedTasks
                ? completedTasks.map(task => {
                    return <CompletedTodo
                        taskText={task.title}
                        key={task.id}
                    />
                })
                : null
            }

        </div>
    );
};

export default CompletedList;