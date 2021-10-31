import React, { useState, useEffect } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";

function List() {
    const [tasks, setTasks] = useState([]);


    const addTask = task => {

        if (!task.text || /^\s*$/.test(task.text)) {
            return;
        }
        const newTasks = [...tasks, task];
        setTasks(newTasks);
    };



    const editTask = (taskId, newValue) => {

        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        setTasks(previous => previous.map(item => (item.id === taskId ? newValue : item)));
    };


    const deleteTask = id => {

        const deleteField = [...tasks].filter(task => task.id !== id)
        setTasks(deleteField);
    }


    const completeTask = id => {

        let updatedTasks = tasks.map(task => {
            if (task.id === id) { task.isComplete = !task.isComplete }
            return task;
        });
        setTasks(updatedTasks);
    };


    //get saved data from local storage
    useEffect(() => {
        const listData = window.localStorage.getItem("listData")
        setTasks(JSON.parse(listData));
    }, []);


    //Save data into the local storage
    useEffect(() => {
        window.localStorage.setItem("listData", JSON.stringify(tasks))
    })


    return (
        <div className="task-app">
            <h2 className="header"> One Step at a time </h2>
            <TaskForm onSubmit={addTask} />
            <Task tasks={tasks}
                completeTask={completeTask}
                editTask={editTask}
                deleteTask={deleteTask} />
        </div>
    )
}

export default List;