import React from 'react';
import classes from "./UserView.module.scss";

const UserView = () => {
    return (
        <div className={classes.userProfile}>
            <div className={classes.userName}>
                <p>Leanne Graham</p>
            </div>
            <div className={classes.userAvatar}/>
            <select className={classes.select}/>
        </div>
    );
};

export default UserView;