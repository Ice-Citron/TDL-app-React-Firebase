import React, { useState, useContext } from 'react'
import { useSpring, animated } from "react-spring"
import { CalendarDate, CaretUp } from 'react-bootstrap-icons' // CaretUp is an icon from react-bootstrap-icons <-- triangle shaped icon

import { calendarItems } from '../constants' // calendarItems is an array of strings exported from array inside ../constants.js directory
import { TodoContext } from '../context'


function Calendar(){
    // STATE
    const [showMenu, setShowMenu] = useState(true)

    // CONTEXT
    const { setSelectedProject } = useContext(TodoContext) // selectedProject is a value which determines what type of "todos" in a specific project to display

    // ANIMATION
    const spin = useSpring({
        transform : showMenu ? 'rotate(0deg)' : 'rotate(180deg)',
        config : { friction : 10 }
    })

    const menuAnimation = useSpring({
        display : showMenu ? 'block' : 'none',
        lineHeight : showMenu ? 1.2 : 0
    })

    
    return ( // syntax extension of JS, used with React to describe what the UI would look like. JSX in this block defines a hierarchical structure of HTML-like elements which will be rendered to DOM.
        <div className='Calendar'> {/* this div acts as the top-level container for entire calendar component. Its used for CSS styling purposes, defining the layout, spacing, etc. */}
            {/*Header Section <-- contains title and button*/}
            <div className="header">
                <div className="title"> {/* this div contains the title of the calendar component (refer to rendered page for clarity) */}
                    <CalendarDate size="18"/>
                    <p>Calendar</p>
                </div>

                {/* DEFAULT --> //<div className="btns"></div>//this div contains the button to toggle the calendar {show or hide} */}
                <animated.div className="btns" style={spin} onClick={() => setShowMenu(!showMenu)}>                 {/* this div contains the button to toggle the calendar {show or hide} */}
                    <span>
                        <CaretUp size="20" />
                    </span>
                </animated.div>
            </div>

            {/*Bottom Subsection <-- contains items of CalendarItems = [x, x, x] array*/}
            <animated.div className="items" style={menuAnimation}>                  {/* DEFAULT --> <div className="items"></div>*/}
                {
                    calendarItems.map( item =>                   // map() method in action. Creates a new array populated with the results of calling a provided function on every element in the calling array.
                        <div className="item" key={item} onClick={ () => setSelectedProject(item) }>        
                        {/* key={items} ensures that reach rendered component has unique id. This is smth related to React's state machine, it basically prevents already rendered object from being rendered twice */}
                            {item}
                        </div>
                    )
                }
            </animated.div>
        </div>
    )
}

export default Calendar