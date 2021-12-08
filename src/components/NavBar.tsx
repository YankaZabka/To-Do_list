import React from 'react';
import classes from "./NavBar.module.scss"

const NavBar = () => {
    return (
        <div className={classes.nav}>
            <div className={classes.btn}>
                <div className={classes.btnImg}/>
            </div>
        </div>
    );
};

export default NavBar;