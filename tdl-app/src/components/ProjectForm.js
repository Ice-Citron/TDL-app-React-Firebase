import React from 'react'


function ProjectForm({handleSubmit, heading, value, setValue, setShowModal, confirmButtonText}){

    return (
        // a typical form, and as mentioned in notes, onSubmit is a default props for all <form>, the function passed in is invoked when the form is submitted
        <form onSubmit={handleSubmit} className='ProjectForm'>
            <h3>{heading}</h3>      {/* <h3> is just heading size */}
            <input
                value={value}                               // value is projectName passed in from AddNewProject.js. Which is just "" at the start
                onChange={(e) => setValue(e.target.value)}  // invoked when the input field is changed, and sets the value of the input field to the value of the input field
                type='text'
                placeholder='project name...'               // placeholder is just short-hint
                autoFocus                                   // autofocus is a boolean attribute of <input> that, when present, makes the input field active when the page loads
            />
            <button className='cancel' role='button' onClick={() => setShowModal(false)}>
                cancel
            </button>
            <button className="confirm">
                {confirmButtonText}                             {/* need to use {} because confirmButtonText is props from JS, or outside of this HTML region */}        
            </button>
        </form>
    )
}

export default ProjectForm