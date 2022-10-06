import React from "react";
import 'primeicons/primeicons.css';
function Tabela(props) {
    var valor = null
    const listatarefas = props.lista.map(tarefa => {
        if(tarefa.concluido == true){
            valor = (<i className="pi pi-check" style={{'fontSize': '2em'}} />)
        }else{
            valor = (<i className="pi pi-ban" style={{'fontSize': '2em'}} />)
        }
        return (
            <tr key={tarefa.id}>
                <td>{tarefa.descricao}</td>
                <td>{valor}</td>
                <td>
                    <button type="button" className="btn btn-primary" style={{ marginRight: '10px' }} onClick={e => props.editar(tarefa)}>
                        <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" className="btn btn-danger" onClick={e => props.deletar(tarefa)}>
                        <i className="pi pi-trash"></i>
                    </button>
                </td>

            </tr>
        )
    })
    return (

        <div className="row">
            <div className="col-lg-12">
                <table className="table table-hover">
                    <thead>
                        {<tr>
                            <th scope="col">Descrição</th>
                            <th scope="col">Concluído</th>
                            <th scope="col">Ações</th>
                        </tr>}
                    </thead>
                    <tbody>
                        {listatarefas}
                    </tbody>
                </table>
            </div>
        </div >
    )
}
export default Tabela;