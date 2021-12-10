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
    const [completedTasks, setCompletedTasks] = useState<Array<IToDo> | undefined>()

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
                        onCopy={(task) => setTasks(prev => prev ? [...prev, {userId: task.userId, id: Date.now(), title: task.title, completed: task.completed}] : undefined)}
                        onDelete={(task) => setTasks(prev => prev ? prev.filter(item => item.id !== task.id) : undefined)}
                        onCompletedChange={(task) => {
                            setTasks(prev => prev ? prev.filter(item => item.id !== task.id) : undefined)
                            setCompletedTasks(prev => {
                                if (!prev) {
                                    return [task]
                                } else return [...prev, task]
                            })
                        }}
                        onCurrentChange={value => setCurrentTask(value)}
                        currentTask={currentTask}
                        tasks={tasks}
                        completedTasks={completedTasks}
                    />

                    <CompletedList
                        completedTasks={completedTasks}
                    />

                </div>

            </div>
        </div>
    );
}

export default App;
