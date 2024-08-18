import React, { createContext, useState } from 'react'

const TodoContext = createContext()

function TodoContextProvider({children}){
    const defaultProject = 'today'
    const [selectedProject, setSelectedProject] = useState(defaultProject)

    return (
        <TodoContext.Provider
            value={
                {
                    selectedProject: selectedProject,
                    setSelectedProject: setSelectedProject
                }
            }
        >
            {children}
        </TodoContext.Provider>
    )
}

export { TodoContextProvider, TodoContext }