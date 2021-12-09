import React from 'react';
import classes from "./App.module.scss"
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import ToDoList from "./components/ToDoList";
import CompletedList from "./components/CompletedList";

function App() {
    return (
        <div className={classes.App}>

            <Header/>

            <div className={classes.main}>

                <NavBar/>

                <div className={classes.ToDo__container}>

                    <ToDoList/>

                    <CompletedList/>

                </div>

            </div>
        </div>
    );
}

export default App;
