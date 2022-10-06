import React from "react";
import { withRouter } from 'react-router-dom'
import UsuarioService from '../App/services/UsuarioService'
import LocalStorageService from "../App/services/localStorageService";
import { AuthContext } from '../main/ProvedorAutenticacao'

class Home extends React.Component {

    state = {
        naoConcluidos: '',
        concluidos: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }
    componentDidMount() {
        this.service.obterTotalTarefasConcluidasENaoConcluidas(LocalStorageService.pegarDaSessao('_usuarioLogado_').id)
            .then(resposta => {
                console.log(resposta.data)
                this.setState({ concluidos: resposta.data[0] })
                this.setState({ naoConcluidos: resposta.data[1] })
            }).catch(erro => {
                console.log(erro.response.data)
            })
    }

    render() {
        return (

            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de controle de atividades.</p>
                <p className="lead" style={{ fontWeight: 'bold' }}>Você tem um total de: {this.state.concluidos} atividade(s) concluída(s)</p>
                <p className="lead" style={{ fontWeight: 'bold' }}>Você tem um total de: {this.state.naoConcluidos} atividade(s) não concluída(s)</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" href="#/cadastro-usuarios" role="button">
                        <i className="fa fa-users" />  Cadastrar Usuário
                    </a>
                    <a className="btn btn-danger btn-lg" href="#/consulta-tarefas" role="button" style={{marginLeft: '10px'}}>
                        <i className="fa fa-users" /> Consultar Atividades</a>
                </p>

            </div>

        )
    }

}

Home.contextType = AuthContext
export default withRouter(Home);