import { React, useState, useContext } from "react"
import { Pencil, XCircle } from 'react-bootstrap-icons'

import Modal from './Modal'
import RenameProject from "./RenameProject"
import { TodoContext } from "../context"


function Project({ project, edit }) {
    // CONTEXT
    const { setSelectedProject } = useContext(TodoContext) // now we are using the context to set the selected project, which acts as global data. Which reduces the need to pass props down the component tree,
                                                           // making our code much cleaner, etc.

    // STATE
    const [showModal, setShowModal] = useState(false)

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
                            <span className="delete">
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