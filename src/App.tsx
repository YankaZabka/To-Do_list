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
        sendRequest("GET", 'https://jsonplaceholder.typicode.com/todos')
            .then((json: Array<IToDo>) => {
                setTasks(json.filter(task => !task.completed))
                setCompletedTasks(json.filter(task => task.completed))
            });
    }, [])

    const deleteTask = (task: IToDo): void => {
        sendRequest("DELETE", `https://jsonplaceholder.typicode.com/todos/${task.id}`)
            .then(response => console.log(response))
        setTasks(prev => prev ? prev.filter(item => item.id !== task.id) : undefined)
    }

    const createTask = (): void => {
        const body = {
            userId: 1,
            id: Date.now(),
            title: inputText,
            completed: false,
        }

        sendRequest("POST", "`https://jsonplaceholder.typicode.com/todos`", body)
            .then((json) => console.log(json));

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
        sendRequest("POST", `https://jsonplaceholder.typicode.com/todos`, {...task, id: Date.now()})
            .then((json) => console.log(json));

        setTasks(prev => prev ? [...prev, {...task, id: Date.now()}] : undefined)
    }

    const editTask = (): void => {
        sendRequest("PATCH", `https://jsonplaceholder.typicode.com/todos/${editedTaskId}`, {title: inputText})
            .then((json) => console.log(json));

        setInputText("")
        setTasks(prev => {
            if (!prev) return

            return prev.map(task => task.id === editedTaskId ? {...task, title: inputText} : task)
        })
    }

    const setCompletedProperty = (task: IToDo): void => {
        sendRequest("PATCH", `https://jsonplaceholder.typicode.com/todos/${task.id}`, {completed: !task.completed})
            .then((json) => console.log(json));

        if (task.completed) {
            setCompletedTasks(prev => prev ? prev.filter(item => item.id !== task.id) : undefined)
            setTasks(prev => prev ? [...prev, {...task, completed: !task.completed}] : [{
                ...task,
                completed: !task.completed
            }])
        } else {
            setTasks(prev => prev ? prev.filter(item => item.id !== task.id) : undefined)
            setCompletedTasks(prev => prev ? [...prev, {...task, completed: !task.completed}] : [{
                ...task,
                completed: !task.completed
            }])
        }
    }

    const deleteCompletedTask = (task: IToDo) => {
        sendRequest("DELETE", `https://jsonplaceholder.typicode.com/todos/${task.id}`)
            .then((json) => console.log(json));

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
                        onCompletedChange={(task) => setCompletedProperty(task)}
                        onCurrentChange={value => setInputText(value)}
                        currentTask={inputText}
                        onEditedTaskIdChange={value => setEditedTaskId(value)}
                        tasks={tasks}
                        completedTasks={completedTasks}
                    />

                    <CompletedList
                        completedTasks={completedTasks}
                        onDelete={(task) => deleteCompletedTask(task)}
                        onCompletedChange={(task) => setCompletedProperty(task)}
                    />

                </div>

            </div>
        </div>
    );
}

export default App;

const sendRequest = (method: string, url: string, body: object | null = null) => {
    if (method === "GET" || method === "DELETE") {
        return fetch(url).then(response => {
            if (response.ok) {
                return response.json()
            }

            return response.json().then(error => {
                throw new Error("Something went wrong: " + error.message)
            })
        })
    }

    const headers = {
        "Content-Type": "application/json; charset=UTF-8"
    }

    return fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: headers
    }).then(response => {
        if (response.ok) {
            return response.json()
        }

        return response.json().then(error => {
            throw new Error(`Something went wrong : ${error.message}`)
        })
    })
}
