import React, {useState} from 'react';
import classes from "./App.module.scss"
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import ToDoList from "./components/To-Do/ToDoList";
import CompletedList from "./components/To-Do/CompletedList";
import IToDo from "./interfaces/IToDo";

function App() {
    const [currentTask, setCurrentTask] = useState<string>("")
    const [tasks, setTasks] = useState<Array<IToDo> | undefined>()

    return (
        <div className={classes.App}>

            <Header/>

            <div className={classes.main}>

                <NavBar/>

                <div className={classes.ToDo__container}>

                    <ToDoList
                        onAdd={() => {
                            setCurrentTask("")
                            setTasks(prev => {
                                if (!prev) {
                                    return [{
                                        userId: 1,
                                        id: 1,
                                        title: currentTask,
                                        completed: false,
                                    }]
                                } else return [...prev, {userId: 1, id: Date.now(), title: currentTask, completed: false}]
                            })
                        }}
                        onCurrentChange={value => setCurrentTask(value)}
                        currentTask={currentTask}
                        tasks={tasks}
                    />

                    <CompletedList/>

                </div>

            </div>
        </div>
    );
}

export default App;
