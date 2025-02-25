import { createContext, useState } from "react";


// eslint-disable-next-line react-refresh/only-export-components
export const TodosContext = createContext();


// eslint-disable-next-line react/prop-types
export const TodoProvider = ({children})=>{
    const [todos,setTodos] = useState([]);



    return(
        <TodosContext.Provider value={{todos,setTodos}}>
            {children}
        </TodosContext.Provider>
    )
}