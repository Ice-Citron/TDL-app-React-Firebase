import React, {useState} from 'react' // import useState

import Modal from './Modal'


function AddNewTodo(){
    // showModal = default variable of false. This will be used to show or hide the modal
    // setShowModal = function that will be used to update the state of "showModal"
    const [showModal, setShowModal] = useState(false)

    return ( // begins the JSX statement for rendering the modal's UI
        <div className='AddNewTodo'>                            {/*outer container for "AddNewTodo" component. It uses className, which is for reference during styling in css*/}
            <div className="btn">                               {/*inner container for button. It uses className, which is for reference during styling in css*/}
                <button onClick={() => setShowModal(true)}>     {/*button that will set "showModal" to true. It uses onClick to trigger the function setShowModal*/}
                    + New Todo 
                </button>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}> {/*Modal component that will be shown when "showModal" is true. It uses showModal and setShowModal as props*/}
                <div>
                    Hello World                             {/*content of the pop-up panel // or "children" in this case*/}  
                    <button
                    onClick={() => setShowModal(false)}>
                        hide
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default AddNewTodo // Ends the component definition, and exports the AddNewTodo component for use in other components // makes it available for other parts of the application to use