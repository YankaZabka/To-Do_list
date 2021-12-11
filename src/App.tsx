import React, {useState} from 'react';
import classes from "./App.module.scss"
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import ToDoList from "./components/To-Do/ToDoList";
import CompletedList from "./components/To-Do/CompletedList";
import IToDo from "./interfaces/IToDo";

function App() {
    const [inputText, setInputText] = useState<string>("")
    const [editedTaskId, setEditedTaskId] = useState<number | undefined>()
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
                            setInputText("")
                            setTasks(prev => {
                                if (!prev) {
                                    return [{
                                        userId: 1,
                                        id: Date.now(),
                                        title: inputText,
                                        completed: false,
                                    }]
                                } else return [...prev, {userId: 1, id: Date.now(), title: inputText, completed: false}]
                            })
                        }}
                        onCopy={(task) => setTasks(prev => prev ? [...prev, {...task, id: Date.now()}] : undefined)}
                        onDelete={(task) => setTasks(prev => prev ? prev.filter(item => item.id !== task.id) : undefined)}
                        onEdit={() => {
                            setTasks(prev => {
                                if (!prev) return

                                return prev.map(task => task.id === editedTaskId ? {...task, title: inputText} : task)
                            })
                            setInputText("")
                        }}
                        onCompletedChange={(task) => {
                            setTasks(prev => prev ? prev.filter(item => item.id !== task.id) : undefined)
                            setCompletedTasks(prev => prev ? [...prev, {...task, completed: !task.completed}] : [{...task, completed: !task.completed}])
                        }}
                        onCurrentChange={value => setInputText(value)}
                        currentTask={inputText}
                        onEditedTaskIdChange={value => setEditedTaskId(value)}
                        tasks={tasks}
                        completedTasks={completedTasks}
                    />

                    <CompletedList
                        completedTasks={completedTasks}
                        onCompletedChange={(task) => {
                            setCompletedTasks(prev => prev ? prev.filter(item => item.id !== task.id) : undefined)
                            setTasks(prev => prev ? [...prev, {...task, completed: !task.completed}] : [{...task, completed: !task.completed}])
                        }}
                    />

                </div>

            </div>
        </div>
    );
}

export default App;
