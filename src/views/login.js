import React from "react";
import Card from '../components/card'
import FormGroup from "../components/form-group";
import '../resources/style.css'
import { withRouter } from 'react-router-dom'
import UsuarioService from "../App/services/UsuarioService";
import { AuthContext } from '../main/ProvedorAutenticacao'
import { Toast } from 'primereact/toast';

class Login extends React.Component {
    constructor() {
        super();
        this.service = new UsuarioService();
    }
    state = {
        email: '',
        senha: '',
        mensagemErro: null
    }
    showSuccess = (mensagem) => { this.toast.show({ severity: 'success', summary: mensagem, detail: null, life: 3000 }) }
    showError = (mensagem) => { this.toast.show({ severity: 'error', summary: mensagem, detail: null, life: 3000 , closable:false}); }
    prepararCadastro = () => {this.props.history.push('/cadastro-usuarios')}

    handleChange = (event) => {
        const valor = event.target.value;
        const nome = event.target.name;
        this.setState({ [nome]: valor });
    }

    entrar = () => {
        this.service.autenticar({ email: this.state.email, senha: this.state.senha }).then(resposta => {
            console.log(resposta)
            this.context.iniciarSessao(resposta.data)
            this.props.history.push('/home')
        }).catch(erro => {
            this.showError(erro.response.data.message)
            this.setState({ mensagemErro: erro.response.data.message })
        })
    }

    render() {
        const message = (
            <Toast ref={(el) => this.toast = el} clo/>
        )
        return (
            <div className="row">
                {message}
                <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                    <div className="bs-docs-section">
                        <Card title="Login" >
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="exampleInputEmail1" >
                                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                                     value={this.state.email} name='email'
                                                     onChange={this.handleChange} />
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                <input type="password"
                                                    className="form-control"
                                                    id="exampleInputPassword1"
                                                    value={this.state.senha} name='senha'
                                                    onChange={this.handleChange} />
                                            </FormGroup>
                                            <button type="button" className="btn btn-success" onClick={this.entrar} style={{ marginRight: '10px' }}>
                                                    Entrar
                                            </button>
                                            <button type="button" className="btn btn-danger" onClick={this.prepararCadastro}>
                                                    Cadastrar
                                            </button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

        )
    }
}

Login.contextType = AuthContext
export default withRouter(Login)