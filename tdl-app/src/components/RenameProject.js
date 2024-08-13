import React, {useState} from 'react'
import ProjectForm from './ProjectForm'

function RenameProject({project, setShowModal}){
    const [newProjectName, setNewProjectName] = useState(project.name)

    function handleSubmit(e){

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