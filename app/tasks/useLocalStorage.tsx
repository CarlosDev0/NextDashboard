import {useState} from "react";
import { Stage } from "./taskTypes";

function useLocalStorage(key: string, initialTask: Stage[]){
    //Check localstorage at mount: Lazy initializer:
    const [tasks, setStoredValue] = useState(()=>{
        try
        {
            const saved = localStorage.getItem(key);
            return saved !== null? JSON.parse(saved): initialTask;
        }catch {
            return initialTask;
        }
    });
    
    const setTasks=(newTasks:Stage[]) =>{
        localStorage.setItem(key, JSON.stringify(newTasks));
        setStoredValue(newTasks);
    }
    return [tasks,setTasks] as const;
}

export default useLocalStorage;