import React from "react";
import Options from "./Options";
//ESSA É OUTRA FORMA DE CRIAR COMPONENTES, COM ARROW FUNCION. 


function Combo(props){

    const list = props.lista.map((option , index)=> {
        return(
            <option key={index} value={option.valor}>{option.label}</option>
        )
    });
    return(
        <select {...props} className="form-control">

            {list}

        </select>
    )
}
export default Combo