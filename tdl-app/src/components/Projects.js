import React, {useState, useContext} from "react"
import { CaretUp, Palette, PencilFill } from 'react-bootstrap-icons'

import AddNewProject from "./AddNewProject"
import Project from "./Project"
import { TodoContext } from "../context"


function Projects() {
    const [showMenu, setShowMenu] = useState(true);
    const [edit, setEdit] = useState(false)                     // set true when pencil button is clicked
    const pencilColor = edit ? "#1EC94C" : "#000000"            // colour of pencil button changes from green to black if button is clicked

    // CONTEXT
    const { projects } = useContext(TodoContext)                // useContext() is a hook that allows you to use the values of the context in your components

    return (
        <div className='Projects'>
            <div className="header">
                <div className="title">
                    <Palette size="18" />
                    <p>Projects</p>
                </div>
                <div className="btns">
                    {
                        showMenu && projects.length > 0 &&              // only show Projects menu, if showMenu is true and there are projects
                        <span className='edit' onClick={ () => setEdit(edit => !edit)}>
                            <PencilFill size="15" color={pencilColor}/>
                        </span>
                    }
                    <AddNewProject />
                    <span className='arrow'>
                        <CaretUp size="20" />
                    </span>
                </div>
            </div>
            <div className="items">
                {
                    projects.map( project =>  // array.map() in action. Key is used to uniquely identify each element in the array, like previously, needed so that React can keep track of each element in the array
                                              // so there's no risk of re-rendering the same element twice
                        <Project
                            project={project}
                            key={project.id}
                            edit={edit}
                        />
                        // all of these inputs are all known as "props" (short for properties) in React. They are inputs to a React component.
                            // "key" is a special prop that's reserved by React (it's not passed to the component) <-- this is a unique identifier, which React uses to keep track of each element in the array, to prevent
                            // re-rendering the same element twice
                    )
                }
            </div>
        </div>
    )
}

export default Projects