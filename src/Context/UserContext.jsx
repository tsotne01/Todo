import { createContext } from "react";


// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();



// eslint-disable-next-line react/prop-types
export const UserProvider = ({children})=>{


    return(
        <UserContext.Provider value={"DSA"}>
            {children}
        </UserContext.Provider>
    )
}