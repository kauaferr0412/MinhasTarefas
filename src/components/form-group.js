import React from "react";


function FormGroup(props) {

    return (
        <>
            <div className="form-group" style={{ marginBottom: '20px' }}>
                <label htmlFor={props.htmlFor} >{props.label}</label>
                {props.children}
            </div>


        </>
    )
}

export default FormGroup;