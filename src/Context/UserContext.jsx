import { createContext, useState } from "react";


// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();



// eslint-disable-next-line react/prop-types
export const UserProvider = ({children})=>{
    const [user,setUser] = useState();
    const [isAuthenticated,setIsAuthenticated] = useState(false);

    return(
        <UserContext.Provider value={{isAuthenticated,setIsAuthenticated,user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}