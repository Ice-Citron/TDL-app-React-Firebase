import React, {useRef} from 'react'


function Modal({children, showModal, setShowModal}) {
    /* children is a special React prop that is used to pass elements directly into the component's output. showModal is a boolean
    that controls the visibility of the modal, and setShowModal is a function to update this state. */

    const modalRef = useRef() // initialises a ref object, which will be attached to a DOM element. "null" initially

    const closeModal = (e) => {
        /* Defines a function that takes an event e as its argument. This function checks if the event's target is the outermost div (the modal background). If so, it 
        sets showModal to false, effectively closing the modal. This typically implements a behavior where clicking on the background outside the actual modal content 
        closes the modal.*/
        if(e.target === modalRef.current){
            setShowModal(false) // i think it means just clicking outside of the div
        }
    }
    
    return (
        showModal && // conditional rendering statement. The modal and its contents will only render if "showModal" is true.
        <div className="Modal" ref={modalRef} onClick={closeModal}>
            <div className="container">
                {children}
            </div>
        </div>
    )
}

export default Modal