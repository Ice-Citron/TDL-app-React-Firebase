import React, { useContext, useEffect, useRef } from 'react'
import { TodoContext } from '../context'


function Sidebar({ children }){
    // CONTEXT
    const { setSelectedTodo } = useContext(TodoContext)

    // REF <-- lasts for the full lifetime of component / unlike state, it doesn't cause re-render
    const sidebarRef = useRef() // reference to the Sidebar component (not initialised yet), seems to be used so that whenever Sidebar component is clicked, it triggers the handleClick function

    useEffect(() => { // doesn't have any dependecies in dependency array, seems like it will run after every render of the Sidebar component
        document.addEventListener('click', handleClick) // adds a click event listener to the document, which triggers handeClick function wheneevr a click occurs
        return () => document.removeEventListener('click', handleClick) // returns a cleanup function that removes the click event listener when the Sidebar component is unmounted or before the component re-renders
    })                                                                  // if the effect is run again

    const handleClick = e => { // sets SelectedTodo context value to undefined (or back to default value, i.e. none selected), when the sidebar is clicked.
        if(e.target === sidebarRef.current || sidebarRef.current.contains(e.target)){ // if click was inside sidebar // sidebarRef.current refers to the DOM node attached to ref attribute of sidebar <-- this condition
                                                                                      // checks if the target of the click is the sidebar itself or also any children component of the sidebar!
            setSelectedTodo(undefined) // clears current selection of any todo item in application state managed by context
        }
    }

    return (
        <div className='Sidebar' ref={sidebarRef}>
            {children}
        </div>
    )
}

export default Sidebar