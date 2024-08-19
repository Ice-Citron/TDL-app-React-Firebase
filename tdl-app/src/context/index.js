import React, { createContext, useState } from 'react'
import { useTodos, useProjects, useFilterTodos } from '../hooks'


const TodoContext = createContext()

function TodoContextProvider({children}){
    const defaultProject = 'today'
    const [selectedProject, setSelectedProject] = useState(defaultProject)

    const todos = useTodos()
    const projects = useProjects(todos)
    const filteredTodos = useFilterTodos(todos, selectedProject) // new addition, basically just acts as filtering function for base todos array, before passing it into context to be used globally as global data
                                                                 // it uses the filter() function conditionally to filter out todos based on the selectedProject
    return (
        <TodoContext.Provider
            value={
                {
                    selectedProject: selectedProject,
                    setSelectedProject: setSelectedProject,
                    todos: filteredTodos,
                    projects: projects
                }
            }
        >
            {children}
        </TodoContext.Provider>
    )
}

export { TodoContextProvider, TodoContext }