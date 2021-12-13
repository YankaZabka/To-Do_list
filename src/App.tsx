import React, {useEffect, useState} from 'react';
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

    useEffect(() => {
        try {
            fetch('https://jsonplaceholder.typicode.com/todos')
                .then((response) => response.json())
                .then((json: Array<IToDo>) => {
                    setTasks(json.filter(task => !task.completed))
                    setCompletedTasks(json.filter(task => task.completed))
                });
        } catch (err) {
            if (err instanceof Error) console.log(err.message)
        }

    }, [])

    const deleteTask = (task: IToDo): void => {
        try {
            fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
                method: 'DELETE',
            });
        } catch (err) {
            if (err instanceof Error) console.log(err.message)
        }
        setTasks(prev => prev ? prev.filter(item => item.id !== task.id) : undefined)
    }

    const createTask = (): void => {
        try {
            fetch(`https://jsonplaceholder.typicode.com/todos`, {
                method: 'POST',
                body: JSON.stringify({
                    userId: 1,
                    id: Date.now(),
                    title: inputText,
                    completed: false,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => console.log(json));
        } catch (err) {
            if (err instanceof Error) console.log(err.message)
        }
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
    }

    const copyTask = (task: IToDo): void => {
        try {
            fetch(`https://jsonplaceholder.typicode.com/todos`, {
                method: 'POST',
                body: JSON.stringify({...task, id: Date.now()}),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => console.log(json));
        } catch (err) {
            if (err instanceof Error) console.log(err.message)
        }

        setTasks(prev => prev ? [...prev, {...task, id: Date.now()}] : undefined)
    }

    const editTask = (): void => {
        try {
            fetch(`https://jsonplaceholder.typicode.com/todos/${editedTaskId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: inputText,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => console.log(json));
        } catch (err) {
            if (err instanceof Error) console.log(err.message)
        }

        setInputText("")
        setTasks(prev => {
            if (!prev) return

            return prev.map(task => task.id === editedTaskId ? {...task, title: inputText} : task)
        })
    }

    const setCompletedToTrue = (task: IToDo): void => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                completed: !task.completed,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
        setTasks(prev => prev ? prev.filter(item => item.id !== task.id) : undefined)
        setCompletedTasks(prev => prev ? [...prev, {...task, completed: !task.completed}] : [{
            ...task,
            completed: !task.completed
        }])
    }

    const setCompletedToFalse = (task: IToDo): void => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                completed: !task.completed,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
        setCompletedTasks(prev => prev ? prev.filter(item => item.id !== task.id) : undefined)
        setTasks(prev => prev ? [...prev, {...task, completed: !task.completed}] : [{
            ...task,
            completed: !task.completed
        }])
    }

    const deleteCompletedTask = (task: IToDo) => {
        try {
            fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
                method: 'DELETE',
            });
        } catch (err) {
            if (err instanceof Error) console.log(err.message)
        }
        setCompletedTasks(prev => prev ? prev.filter(item => item.id !== task.id) : undefined)
    }

    return (
        <div className={classes.App}>

            <Header/>

            <div className={classes.main}>

                <NavBar/>

                <div className={classes.ToDo__container}>

                    <ToDoList
                        onAdd={() => createTask()}
                        onCopy={(task) => copyTask(task)}
                        onDelete={(task) => deleteTask(task)}
                        onEdit={() => editTask()}
                        onCompletedChange={(task) => setCompletedToTrue(task)}
                        onCurrentChange={value => setInputText(value)}
                        currentTask={inputText}
                        onEditedTaskIdChange={value => setEditedTaskId(value)}
                        tasks={tasks}
                        completedTasks={completedTasks}
                    />

                    <CompletedList
                        completedTasks={completedTasks}
                        onDelete={(task) => deleteCompletedTask(task)}
                        onCompletedChange={(task) => setCompletedToFalse(task)}
                    />

                </div>

            </div>
        </div>
    );
}

export default App;
