import React, {useState} from 'react'

import Modal from './Modal'
import ProjectForm from './ProjectForm'

import { Plus } from 'react-bootstrap-icons'
import fireDB from "../firebase"
import { collection, query, where, getDocs, addDoc } from "firebase/firestore"


function AddNewProject() {
    const [showModal, setShowModal] = useState(false);          // NEED TO CHECK ON WHY IS USESTATE USED INSTEAD OF SETSTATE
    const [projectName, setProjectName] = useState('');         // https://dev.to/johnstonlogan/react-hooks-barney-style-1hk7
                                                                // fairly minor difference. but basically just class component vs functional component. Since we are only using functional components, we use useState instead 
                                                                // of setState
    async function handleSubmit(e){                 // async function to handle the submission of the form    <-- asynchronous, doesn't need to sync up, increases speed
        e.preventDefault();
        // CHANGED, section below is changed to accommodate for Firebase +9 version
        if (projectName) {
            const projectsRef = collection(fireDB, 'projects');
            const q = query(projectsRef, where('name', '==', projectName)); // "q" is a query constructed to find documents in the "projects" collection, where the "name" field
                                                                            // equals "projectName"
            try {
                const querySnapshot = await getDocs(q);   // asynchronously retrieves the documents based on query "q". "getDocs()" returns a querySnapshot, and then "await" allows the code to pause until 
                                                          // this Firestore operation is complete
                if (querySnapshot.empty) {                                  // this means if no documents matches the query, or that if the project doesnt exist, then add the project
                    await addDoc(projectsRef, { name: projectName });       // "addDoc()" adds a new document to the "projects" collection, with the field "name" set to "projectName"
                    console.log('Project added successfully');
                } 
                else {
                    alert('Project already exists!');
                }
                setShowModal(false);
                setProjectName('');
            } 
            catch (error) {
                console.error('Error checking/adding project: ', error);
            }
        }
    }

    return (
        // AddNewProject component is a button with a plus icon
        <div className='AddNewProject'>
            <div className="add-button">
                <span onClick={() => setShowModal(true)}> {/* When span (non-semantic component like <div>, but is inline instead) is clicked, the modal will be shown */}
                    <Plus size="20" />
                </span>
            </div>
            {/* Use of modal is very smart here, basically all of the previously defined features for modal can all be reused again. Once again just need to pass in the props of "showModal" and
                "setShowModal". Then just submit a different children and it can be used again! */}
            <Modal showModal={showModal} setShowModal={setShowModal}>
                {/* ProjectForm creates a new project. For its props, refer to the function itself to see what they are used for. Generally, values and methods are passed in by reference, such as  
                    projectName, handleSubmit, setShowModal and setProjectName */}
                <ProjectForm
                    handleSubmit={handleSubmit}
                    heading='New project!'
                    value={projectName}
                    setValue={setProjectName}
                    setShowModal={setShowModal}
                    confirmButtonText='+ Add Project'
                />
            </Modal>
        </div>
    )
}

export default AddNewProject;