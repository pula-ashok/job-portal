import { createContext } from "react";

export const AppContext=createContext(null)

const AppContextProvider=(props)=>{
    const value={}
    return <AppContext.Provider value={value}>
        {pros.children}
    </AppContext.Provider>
}
export default AppContextProvider