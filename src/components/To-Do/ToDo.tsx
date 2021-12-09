import React from 'react';
import classes from "./ToDo.module.scss";

const ToDo = () => {
    return (
        <div className={classes.ToDo}>
            <div className={classes.ToDo__leftSide}>
                <input type="checkbox" id="checkbox" defaultChecked={false}/>
                <label htmlFor={"checkbox"}>Add Icon to Dashboard</label>
            </div>
            <div className={classes.ToDo_btns}>
                <div className={classes.editBtn}/>
                <div className={classes.copyBtn}/>
                <div className={classes.deleteBtn}/>
            </div>
        </div>
    );
};

export default ToDo;