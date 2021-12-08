import React from 'react';
import classes from "./Header.module.scss"
import UserView from "./UserView";

const Header = () => {
    return (
        <div className={classes.header}>
            <div className={classes.leftPart}>
                <div className={classes.img}/>
                <div className={classes.title}>
                    <h1>Tasks</h1>
                </div>
            </div>
            <UserView/>
        </div>
    );
};

export default Header;