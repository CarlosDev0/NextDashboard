"use client";

import React, { useEffect, useReducer, useRef } from "react";
import "./style.scss";
import useLocalStorage from "./useLocalStorage";
import {Stage} from "./taskTypes";

type State = {
  tasks: Stage[];
};


type Action =
  | { type: "addTask"; task: Stage }
  | { type: "deleteTask"; index: number }
  | { type: "completedTask"; index: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "addTask": {
      return {
        ...state,
        tasks: [...state.tasks, { text: action.task.text || "", state: action.task.state || false } as Stage],
      };
    }
    case "deleteTask": {
      return {
        ...state,
        tasks: state.tasks.filter((_, i) => i !== action.index),
      };
    }
    case "completedTask":{
      return {
        ...state,
        tasks: state.tasks.map((task,i)=>
        i ===action.index ? {...task, state: !task.state}: task)
      }
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
        task: {text: textTask.current.value, state: false},
      });
      textTask.current.value = "";
    }
  };
  //Initial charge of tasks:
  useEffect(()=>{
    tasks.map((task:Stage)=>{
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
          state.tasks.map((task: Stage, index) => (
            <div className="task-item" key={index}>
              <p> {task.state?(<span style={{textDecoration:'line-through'}}>
        {task.text} </span>

       ):<span>{task.text}</span>}
              {/* <p className="task-text">{task.text} */}
              </p>
              <div className="task-buttons">
                <button
                  className="delete-button"
                  onClick={() => dispatch({ type: "deleteTask", index:index })}
                >Delete{" "}</button>
                 <button
                    className={`complete-button ${task.state ? "completed" : ""}`}
                    disabled={task.state}
                    onClick={() => dispatch({ type: "completedTask", index })}
                  >
                    {task.state ? "Done" : "Complete"}
                  </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
export default Task;