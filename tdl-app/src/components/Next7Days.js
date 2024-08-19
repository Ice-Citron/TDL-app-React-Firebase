import React, { useEffect, useState } from 'react'

import Todo from './Todo'
import dayjs from 'dayjs'


function Next7Days({ todos }) {
    const [weekTodos, setWeekTodos] = useState([])  // initialises state variable (and setter) that will store todos sorted and arranged by the next 7 days, starting from today

    useEffect(() => {
        const days = ['0', '1', '2', '3', '4', '5', '6']

        const sortedTodosByDay = days.map(day => { // map applies the function to each element of the array and returns a new array
            return {
                todos: todos.filter(todo => todo.day === day), // filters the todos array to only include todo that have the same day (0-6) as the current day (0-6)
                number: day                                    // sets the number property to the current day (0-6)
            }
        })

        const today = parseInt(dayjs().format('d')) // gets the current day (0-6) of the week using dayjs() and converts it to an integer (from string)

        const arrangeDays = sortedTodosByDay.slice(today).concat(sortedTodosByDay.slice(0, today)) // slice operation, the idea is to ensure that the current day of week starts first, the rest of the days follow in order

        setWeekTodos(arrangeDays)
    }, [todos])

    return (
        <div className='Next7Days'>
            {
                // map() used, maps through the weekTodos array and returns a new array of JSX elements
                weekTodos.map(day =>
                    <div key={day.number}>
                        <div className='day'>
                            <div className='name'>
                                {dayjs().day(parseInt(day.number)).format('dddd')}  {/* This converts the day numbers (0-6) to words (sunday-saturday) */}
                                {day.number === dayjs().format('d') && ' (Today)'}  {/* If the currently processed day is same as current day of week, then also write out " (Today)"*/}
                            </div>
                            <div className='total-todos'>
                                ({day.todos.length}) {/* This displays the total number of todos for the current day */}
                            </div>
                        </div>
                        <div className='todos'>
                            {   
                                // This section is now to display all the todos for the current day, as in the outer loop, we are looping through each weekday, and now we are managing a single day
                                        // map() here, which means the function vbelow will be applied to each todo in the todos array for the each current day of wekk
                                day.todos.map(todo =>
                                    <Todo key={todo.id} todo={todo} />
                                )
                            }
                        </div>
                    </div>

                )
            }
        </div>
    )
}

export default Next7Days