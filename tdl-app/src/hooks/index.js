import { useState, useEffect, useMemo } from 'react'
import fireDB from '../firebase' // CHANGED --> firebase.firestore() no longer valid as an operation
import { collection, onSnapshot } from 'firebase/firestore' // this needs to be added, since we are using newer version of firebase
import dayjs from 'dayjs'


export function useTodos(){
    // STATE
    const [todos, setTodos] = useState([]);


    const todosRef = collection(fireDB, "todos");

    useEffect(() => {
        // CHANGED --> firebase.firestore() no longer valid as an operation
        let unsubscribe = onSnapshot(todosRef, (snapshot) => {
            const data = snapshot.docs.map( doc => {
                return {
                    id : doc.id,
                    ...doc.data()
                }
            })
            console.log("Subscribe to Todos");
            setTodos(data);
        });
        return () => unsubscribe();
    }, []); // includes fireDB too, so that when there's changes made to fireDB, this function is called // keep empty dependency array, else function will call itself infinitely

    return todos;
}

// CHANGED - to redress for Firebase v9+
export function useProjects(todos){
    const [projects, setProjects] = useState([]);

    function calculateNumOfTodos(projectName, todos){
        return todos.filter( todo => todo.projectName === projectName).length;
    }

    const projectsRef = collection(fireDB, "projects");

    useEffect(() => {
        // CHANGED --> firebase.firestore() no longer valid as an operation
        // CHANGED --> firebase.firestore().collection().onSnapshot() no longer valid as an operation
        
        // need to check and note down why is "let" used instead of "const"
        const unsubscribe = onSnapshot(projectsRef, (snapshot) => {
            const data = snapshot.docs.map( doc => {
                const projectName = doc.data().name;

                return {
                    id : doc.id,
                    name : projectName,
                    numOfTodos : calculateNumOfTodos(projectName, todos)
                }
            })
            setProjects(data);
            console.log("Subscribe to Projects");
        });
        return () => unsubscribe();
    }, []); // includes fireDB too, so that when there's changes made to fireDB, this function is called

    return projects;
}

export function useFilterTodos(todos, selectedProject){         // function is exported, so it can be imported and used in other components
    const [filteredTodos, setFilteredTodos] = useState([])      // state variables and setters, these stores the filtered list of todos. NOTICE how its initialized as an empty array

    useEffect( () => {
        let data; // let is a local variable initialisation. The keyword let is used to declare variables that are limited in scope to the block, statement, or expression on which it is used. This is 
                  // unlike the var keyword, which defines a variable globally, or locally to an entire function regardless of block scope.
                  // Further, this variable declared with "let" enables it to be reassigned within the different branches of conditional statements that follow, based on critieria specified by selectedProject

        const todayDateFormatted = dayjs().format('MM/DD/YYYY') // switched to using dayjs instead
                                                                // this formatted date is used to compare dates in the todo items

        if (selectedProject === 'today') { // if selectedProject is "today", then we will only filter out all the "todos" thats dued today (using filter() method)
            data = todos.filter(todo => todo.date === todayDateFormatted)
        }
        else if (selectedProject === 'next 7 days') { // if selectedProject is "next 7 days", then we will only filter out all the "todos" thats dued in the next 7 days
            data = todos.filter(todo => {
                const todoDate = dayjs(todo.date, 'MM/DD/YYYY')
                const todayDate = dayjs(todayDateFormatted, 'MM/DD/YYYY')
                const diffDays = todoDate.diff(todayDate, 'days')

                return diffDays >=0 && diffDays < 7 // this filters out due dates which are within next 7 days from today, but also ensure that tasks from before today (in the past) are not included
            })
        } 
        else if( selectedProject === 'all days') {
            data = todos
        } 
        else {
            data = todos.filter(todo => todo.projectName === selectedProject) // else, if we are not filtering by time, then we filter by projects
        }

        setFilteredTodos(data)  // at this point, data contains the filtered lists
    }, [todos, selectedProject])

    return filteredTodos
}

export function useProjectsWithStats(projects, todos) {
    const [projectsWithStats, setProjectsWithStats] = useState([]);

    const todoCountByProject = useMemo(() => {
        return todos.reduce((acc, todo) => {    
            // reduce() method reduces an array to a single value. It takes 2 parameter here, accumulator "acc" and the current value "todo"
                // reduce() seems to be idea when trying to aggregate data into a single output from array; which makes sense, since here, we are trying to sum all the todos objects based on their projectNames
                // since we are trying to find the "todoCount" for each Project.
            if (!todo.checked) { acc[todo.projectName] = (acc[todo.projectName] || 0) + 1; }
            return acc;
        }, {}); // empty {} serves as the initial value of the accumulator "acc" (an empty object). As "reduce" iterates over the array, it builds this object by adding properties where
                // (in this case) each property key is a project name, and the value is the summed count of unchecked todos for each respective project.
    }, [todos]);// indicates this useMemo() function will only be called when "todos" changes

    useEffect(() => {
        const data = projects.map((project) => ({
            ...project,
            numOfTodos: todoCountByProject[project.name] || 0 // if not in the todoCountByProject object (which means no todos), then default to 0
        }));
        setProjectsWithStats(data);
    }, [projects, todoCountByProject]);

    return projectsWithStats;
}



// ARCHIVE <-- TO SHOW WHAT CAN USEEFFECT'S 2ND ARGUMENT DO

/*
    useEffect(() => {
        // CHANGED --> firebase.firestore() no longer valid as an operation
        let unsubscribe = onSnapshot(todosRef, (snapshot) => {
            const data = snapshot.docs.map( doc => {
                return {
                    id : doc.id,
                    ...doc.data()
                }
            })
            console.log("Subscribe")
            setTodos(data)
        }, 
        (error) => {
            console.log("Effect Called")
        });
        return () => unsubscribe()
    }, [fireDB, todosRef]) // includes fireDB too, so that when there's changes made to fireDB, this function is called

*/ 