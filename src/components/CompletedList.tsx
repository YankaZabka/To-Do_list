import React from 'react';
import classes from "./CompletedList.module.scss"
import CompletedTodo from "./CompletedTodo";

const CompletedList = () => {
    return (
        <div className={classes.list}>

            <div className={classes.title}>
                <h1>Completed (4)</h1>
            </div>

            <CompletedTodo/>

        </div>
    );
};

export default CompletedList;