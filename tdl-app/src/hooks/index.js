import { useState, useEffect } from 'react'
import fireDB from '../firebase' // CHANGED --> firebase.firestore() no longer valid as an operation

import { collection, onSnapshot } from 'firebase/firestore' // this needs to be added, since we are using newer version of firebase


export function useTodos(){
    const [todos, setTodos] = useState([])

    const todosRef = collection(fireDB, "todos")

    useEffect(() => {
        // CHANGED --> firebase.firestore() no longer valid as an operation
        let unsubscribe = onSnapshot(todosRef, (snapshot) => {
            const data = snapshot.docs.map( doc => {
                return {
                    id : doc.id,
                    ...doc.data()
                }
            })
            setTodos(data)
        }, 
        (error) => {
            console.error("Error fetching todos:", error);
            console.log("Error code:", error.code);
            console.log("Error message:", error.message);
            console.log("Full error object:", JSON.stringify(error, null, 2));
        });
        return () => unsubscribe()
    }, [fireDB, todosRef]) // includes fireDB too, so that when there's changes made to fireDB, this function is called

    return todos
}

export function useProjects(todos){
    const [projects, setProjects] = useState([])

    function calculateNumOfTodos(projectName, todos){
        return todos.filter( todo => todo.projectName === projectName).length
    }

    const projectsRef = collection(fireDB, "projects")

    useEffect(() => {
        // CHANGED --> firebase.firestore() no longer valid as an operation
        // CHANGED --> firebase.firestore().collection().onSnapshot() no longer valid as an operation
        
        // need to check and note down why is "let" used instead of "const"
        const unsubscribe = onSnapshot(projectsRef, (snapshot) => {
            const data = snapshot.docs.map( doc => {
                const projectName = doc.data().name

                return {
                    id : doc.id,
                    name : projectName,
                    numOfTodos : calculateNumOfTodos(projectName, todos)
                }
            })
            setProjects(data)
        });
        return () => unsubscribe()
    }, [fireDB, projectsRef, todos]) // includes fireDB too, so that when there's changes made to fireDB, this function is called

    return projects
}