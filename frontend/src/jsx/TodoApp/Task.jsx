import React, { useState } from "react";
import TaskForm from "./TaskForm";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaUndoAlt } from "react-icons/fa";


const Task = ({ tasks, completeTask, editTask, deleteTask }) => {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })


    //A function to be called upon click on edit icon
    const update = value => {
        editTask(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    }


    if (edit.id) {
        return <TaskForm edit={edit} onSubmit={update} />;
    }


    //returns each task with the options
    return tasks.map((task, index) => (
        <div
            className={task.isComplete ? "task-row-complete" : "task-row"}
            key={index}

        >
            <div key={task.id} >
                {task.text}
            </div>

            <div className="icons">
                {task.isComplete ? <FaUndoAlt onClick={() => completeTask(task.id)} className="checkbox_icon" />
                    : <AiFillCheckCircle onClick={() => completeTask(task.id)} className="checkbox_icon" />}

                {task.isComplete ? null
                    : <BiEdit onClick={() => setEdit({ id: task.id, value: task.text })} className="edit-icon" />}

                <RiDeleteBin5Fill onClick={() => deleteTask(task.id)} className="delete-icon" />
            </div>
        </div >
    ))
}

export default Task;