import React, {useContext, useState} from 'react'

import ProjectForm from './ProjectForm'
import { TodoContext } from '../context'

import fireDB from "../firebase"
import { collection, doc, query, where, getDocs, updateDoc } from "firebase/firestore"


function RenameProject({project, setShowModal}){
    // STATE
    const [newProjectName, setNewProjectName] = useState(project.name)

    // CONTEXT
    const { selectedProject, setSelectedProject } = useContext(TodoContext)

    // rename Project
    const renameProject = async (project, newProjectName) => {
        const projectsRef = collection(fireDB, 'projects')
        const todosRef = collection(fireDB, 'todos')

        const { name : oldProjectName } = project

        try {
            // Check if a project with the new name already exists
            const projectQuery = query(projectsRef, where('name', '==', newProjectName));
            const projectQuerySnapshot = await getDocs(projectQuery);
    
            if (!projectQuerySnapshot.empty) { // meaning that "newProjectName" is already in use by another existing project
                alert('Project with the same name already exists!');
                return;
            }
            else {
                // Update the project name
                const projectDocRef = doc(projectsRef, project.id);
                await updateDoc(projectDocRef, { name: newProjectName });
        
                // Update todos with the old project name
                const todosQuery = query(todosRef, where('projectName', '==', oldProjectName));
                const todosQuerySnapshot = await getDocs(todosQuery); // akin to before, creates a query, which by the end, "todosQuerySnapshot" will contain all the docs that matches the query
        
                const updatePromises = todosQuerySnapshot.docs.map(doc => // .map() is then used here again, which will update the projectName for all docs in the query
                    updateDoc(doc.ref, { projectName: newProjectName })
                );
        
                await Promise.all(updatePromises);
        
                // If selected project is referencing to current project, need to update its references
                if (selectedProject === oldProjectName) { setSelectedProject(newProjectName); }
        
                console.log(`Renamed project "${oldProjectName}" to "${newProjectName}". And related todos updated successfully`);
            }
        } catch (error) {
            console.error('Error updating project:', error);
        }
    }

    function handleSubmit(e){
        e.preventDefault()

        renameProject(project, newProjectName)

        setShowModal(false)
    }

    return (
        <div className='RenameProject'>
            <ProjectForm
                handleSubmit={handleSubmit}             // these are just functions and values which are passed in as props to the ProjectForm component
                heading='Edit project name!'            // title of form
                value={newProjectName}
                setValue={setNewProjectName}
                setShowModal={setShowModal}
                confirmButtonText='Confirm'
            />
        </div>
    )
}

export default RenameProject