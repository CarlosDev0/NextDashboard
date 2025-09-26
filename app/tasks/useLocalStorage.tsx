import {useState} from "react";

function useLocalStorage(key: string, initialTask: string[]){
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
    
    const setTasks=(newTasks:string[]) =>{
        localStorage.setItem(key, JSON.stringify(newTasks));
        setStoredValue(newTasks);
    }
    return [tasks,setTasks] as const;
}

export default useLocalStorage;