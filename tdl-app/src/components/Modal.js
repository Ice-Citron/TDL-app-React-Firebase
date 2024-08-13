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
        {/* CHECK NOTES BUT:
            "ref={modalRef} when used, will cause React to set modalRef.current to point to this rendered div. Basicaoly, after the component mounts, "modelRef.current*
            will contain the actual DOM made corresponding to this div. Linkage here is automatically managed by React. <-- hence i believe, this will enable the closeModal
            function to setShowModal whenever needed //  seems to be  necessary because modal component is a JSX return, and DOM element needs to be tied to ref, to ensure can do work on it*/}
        {/* CHECK NOTES ONCE AGAIN BUT:
            onClick attribute is an event handler which listens for click eevnts on the element it is applied to (buttons, div or any clickable element---div in this
            case). When a function is specified for onClick={closeModal}, this function---closeModal is called everytime a click is detected. A event listener basically. */}
            <div className="container">
                {children}
            </div>
        </div>
    )
}

export default Modal