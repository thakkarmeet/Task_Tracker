import React, { useRef, useState, useEffect, } from "react";

function TaskForm(props) {
    const [text, setText] = useState(props.edit ? props.edit.value : '');
    const textRef = useRef(null)


    //Keep the focus on input on page load
    useEffect(() => {
        textRef.current.focus();
    })

    const handleChange = e => {
        setText(e.target.value);
    };


    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            //Assign a random id to each task input
            id: Math.floor(Math.random() * 10000),
            text: text
        });

        setText('');
    };


    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="What do you plan on achieving today?"
                value={text}
                className="task-input"
                onChange={handleChange}
                ref={textRef}
            />
            <button className="task-button" >  Done  </button>

        </form>
    )
}

export default TaskForm;