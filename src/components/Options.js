import React from "react";

function Options(props){
    const list = props.lista.map((option , index)=> {
        return(
            <option key={index} value={option.valor}>{option.label}</option>
        )
    });

    return list;
}
export default Options