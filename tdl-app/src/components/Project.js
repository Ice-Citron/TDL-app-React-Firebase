import { React, useState, useContext } from "react"
import { Pencil, XCircle } from 'react-bootstrap-icons'

import Modal from './Modal'
import RenameProject from "./RenameProject"
import { TodoContext } from "../context"

import fireDB from "../firebase"
import { collection, doc, deleteDoc, query, getDocs, where } from "firebase/firestore"


function Project({ project, edit }) {
    // CONTEXT
    const { setSelectedProject } = useContext(TodoContext) // now we are using the context to set the selected project, which acts as global data. Which reduces the need to pass props down the component tree,
                                                           // making our code much cleaner, etc.
    // STATE
    const [showModal, setShowModal] = useState(false)


    // MODIFIED, to redress code for Firebase v9+
    const deleteProject = async (project, selectedProject, setSelectedProject, defaultProject) => {  // like Todo.js, this is declaring a const variable async function once again, which takes in multiple input args
        try {
            // Delete the project
            const projectRef = collection(fireDB, 'projects');
            const projectDoc = doc(projectRef, project.id);
            await deleteDoc(projectDoc); // function execution is stopped here, until "deleteDoc()" operation completes
    
            // Query for todos with matching projectName
            const todosRef = collection(fireDB, 'todos');
            const q = query(todosRef, where('projectName', '==', project.name)); // query() constructs a query object, to find all the documents in "todos" collection using "todosRef"
                                                                                 // It finds all the documents where the field "projectName" is equal to the project name.
            const querySnapshot = await getDocs(q); // Executes the query, whcih retrieves the documents in "todos" collection, that match the query.
                                                    // once again, "await" keyword pauses execution until all matching documents are retrieved. 
                                                    // After this, "querySnapshot", contains all the documents which matches this query --> "where('projectName', '==', project.name)"
            // Delete all matching todos
            const deletions = querySnapshot.docs.map(doc => deleteDoc(doc.ref)); // map() iterates over all the documents in "querySnapshot.docs" array, and for each document, it deletes the document
            await Promise.all(deletions);           // waits for all the deletion promises to resolve. 
                                                    // Promise.all() runs all the promises in parallel (deletions in this case), and waits for all of them to resolve before continuing onwards with this function
            // Update selected project if necessary
            if (selectedProject === project.name) {
                setSelectedProject(defaultProject);
            }
    
            console.log(`Project "${project.name}" and associated todos deleted successfully`); // the character `` or backticks enables for custom templates like this to be created!
        } 
        catch (error) {
            console.error('Error deleting project:', error);
        }
    };


    return (
        <div className='Project'>
            <div className="name" onClick={ () => setSelectedProject(project.name) }>
                {project.name}
            </div>
            <div className="btns">
                {
                    edit ?          // conditional operator, akin to C/C++ ! :)
                        // <span>s here are used to contain these icons, which will be made to buttons soon
                        <div className="edit-delete">
                            <span className="edit" onClick={ () => setShowModal(true)}> {/* When span is clicked, the modal will be shown */}
                                <Pencil size="13" />
                            </span>
                            <span className="delete" onClick={ () => deleteProject(project) }>
                                <XCircle size="13" />
                            </span>
                        </div>
                    : 
                        project.numOfTodos === 0 ? // don't display the number of ToDos if there are none
                            ""
                        :                          // else, display the number of ToDos inside a <div>
                            <div className="total-todos">
                                {project.numOfTodos}
                            </div>
                }
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <RenameProject project={project} setShowModal={setShowModal}/>
            </Modal>
        </div>
    )
}

export default Project