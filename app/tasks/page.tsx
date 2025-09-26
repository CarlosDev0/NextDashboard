"use client";

import React, { useEffect, useReducer, useRef } from "react";
import "./style.scss";
import useLocalStorage from "./useLocalStorage";

type State = {
  tasks: string[];
};

type Action =
  | { type: "addTask"; task: string }
  | { type: "deleteTask"; index: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "addTask": {
      return {
        ...state,
        tasks: [...state.tasks, action.task || ""],
      };
    }
    case "deleteTask": {
      return {
        ...state,
        tasks: state.tasks.filter((_, i) => i !== action.index),
      };
    }
    default: {
      return { ...state };
    }
  }
}

function Task() {
  const [state, dispatch] = useReducer(reducer, { tasks: [] });
  const textTask = useRef<HTMLInputElement>(null);
  const [tasks, setTasks] = useLocalStorage('tasks',[]);   //Custom hook to store in localStorage

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (textTask.current && textTask.current.value) {
      dispatch({
        type: "addTask",
        task: textTask.current.value,
      });
      textTask.current.value = "";
    }
  };
  //Initial charge of tasks:
  useEffect(()=>{
    tasks.map((task:string)=>{
      dispatch({
      type: "addTask",
      task: task,
      });
    });
  },[]);

  //Update tasks into localStorage when task list change:
  useEffect(()=>{
    setTasks(state.tasks);
  },[state]);

  return (
    <div className="task-container">
      <div className="mainTitle">
        <p>TASKS APPLICATION</p>
      </div>
      <div>
        <p>This module uses useReducer and useRef to handle the state of every
        task.</p>
        <p>The list is cached in the LocalStorage of your browser. When you refresh this page, the stored values 
          are not lost.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          id="taskInput"
          type="text"
          name="task"
          ref={textTask}
          placeholder="Enter a new task"
          className="task-input"
        />
        <input type="submit" value="Send" />
      </form>
      <label className="labelTitle">Task List:</label>
      <div className="task-list">
        {state.tasks &&
          state.tasks.map((task: string, index) => (
            <div className="task-item" key={index}>
              <p className="task-text">{task}</p>
              <button
                className="delete-button"
                onClick={() => dispatch({ type: "deleteTask", index })}
              >
                Delete{" "}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
export default Task;