import React, {useState, useContext} from "react"
import { CaretUp, Palette, PencilFill } from 'react-bootstrap-icons'
import { useSpring, animated } from "react-spring"

import AddNewProject from "./AddNewProject"
import Project from "./Project"
import { TodoContext } from "../context"


function Projects() {
    const [showMenu, setShowMenu] = useState(true);
    const [edit, setEdit] = useState(false)                     // set true when pencil button is clicked
    const pencilColor = edit ? "#1EC94C" : "#000000"            // colour of pencil button changes from green to black if button is clicked

    // CONTEXT
    const { projects } = useContext(TodoContext)                // useContext() is a hook that allows you to use the values of the context in your components
                                                        // it seems to be since this is a ever changing global data. By defining upstream, or inside hooks directory, which
                                                        // is then subsequently linked to the context, it allows for the data from firebase to be used here for example,
                                                        // very convenient, wihout having to pass props down manually at every level too.
                                                                // and since useEffect({}, []) enables the data to be continuously refreshed. Once the data is retrieved whenever
                                                                // a change is made. Then we just pass the props data down to each project like before!
    // ANIMATION
    const spin = useSpring({
        transform : showMenu ? 'rotate(0deg)' : 'rotate(180deg)',
        config : { friction : 10 }
    })

    const menuAnimation = useSpring({
        display : showMenu ? 'block' : 'none',
        lineHeight : showMenu ? 1.2 : 0
    })

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
                    <animated.span className="arrow" onClick={() => setShowMenu(!showMenu)} style={spin}>            {/* DEFAULT --> <span className='arrow'></span>*/}
                        <CaretUp size="20" />
                    </animated.span>
                </div>
            </div>
            <animated.div className="items" style={menuAnimation}>                          {/* DEFAULT --> <div className="items"></div> */}
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
            </animated.div>
        </div>
    )
}

export default Projects