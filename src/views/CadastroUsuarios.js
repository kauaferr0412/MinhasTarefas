import React from "react";
import Card from '../components/card'
import FormGroup from "../components/form-group.js";
import { withRouter } from 'react-router-dom'
import UsuarioService from '../App/services/UsuarioService'
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        repetirSenha: '',
        carregar: false
    }
    constructor() {
        super();
        this.service = new UsuarioService();
        this.data = null;
    }
    showSuccess = (mensagem) => { this.toast.show({ severity: 'success', summary: mensagem, detail: null, life: 3000 }) }
    showError = (mensagem) => { this.toast.show({ severity: 'error', summary: mensagem, detail: null, life: 3000, closable: false }); }
    cancelar = () => { this.props.history.push('/home') }
    handleChange = (event) => {
        const valor = event.target.value;
        const nome = event.target.name;
        this.setState({ [nome]: valor });
    }

    zerarCampos() {
        this.setState({ nome: '' })
        this.setState({ email: '' })
        this.setState({ senha: '' })
        this.setState({ repetirSenha: '' })

    }

    validar() {
        const msg = [];
        if (!this.state.nome) {
            msg.push('O campo nome não pode estar vazio')
        }

        if (!this.state.email) {
            msg.push('O campo email não pode estar vazio')
        } else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            msg.push('Informe um e-mail válido!')
        }

        if (!this.state.senha || !this.state.repetirSenha) {
            msg.push('A senha deve ser informada duas vezes para validação e segurança')
        } else if (this.state.senha !== this.state.repetirSenha) {
            msg.push('As senhas não coincidem')
        }
        return msg;
    }

    cadastrar = () => {

        const msgs = this.validar();

        if (msgs && msgs.length > 0) {
            msgs.forEach((msg, index) => {
                this.showError(msg)
            })

            return;

        }

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }
        if (this.state.senha == this.state.repetirSenha) {
            this.service.cadastrar(usuario).then(response => {
                this.zerarCampos();
                this.showSuccess('Usuário cadastrado com sucesso!! Faça o Login para acessar o sistema')
                this.props.history.push('/login')

            }).catch(erro => {
                this.data = erro.response.data
                console.log(this.data)
                this.showError(this.data)
            })

        } else {
            this.showError('As senhas não coincidem!!')
        }

    }

    render() {
        const message = (
            <Toast ref={(el) => this.toast = el} clo />
        )
        return (
            <div>
                {message}
                <div className="row">
                    <div className="col-lg-6" style={{ position: 'relative', left: '300px' }}>
                        <div className="bs-component"></div>

                        <Card title="Cadastro de Usuários" >


                            <fieldset>
                                <FormGroup label="Nome: *" htmlFor="inputNome" >
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="inputNome"
                                        aria-describedby="emailHelp"
                                        value={this.state.nome}
                                        name='nome'
                                        onChange={this.handleChange} />
                                </FormGroup>
                                <FormGroup label="Email: *" htmlFor="inputEmail">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="inputEmail"
                                        aria-describedby="emailHelp"
                                        value={this.state.email}
                                        name='email'
                                        onChange={this.handleChange} />
                                    <small
                                        id="emailHelp"
                                        className="form-text text-muted">
                                        Não divulgamos o seu email.
                                    </small>
                                </FormGroup>
                                <FormGroup label="Senha: *" htmlFor="inputSenha">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="inputEmail"
                                        value={this.state.senha}
                                        name='senha'
                                        onChange={this.handleChange} />
                                </FormGroup>
                                <FormGroup label="Repita a senha: *" htmlFor="inputRepetirSenha">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="inputRepetirSenha"
                                        value={this.state.repetirSenha}
                                        name='repetirSenha'
                                        onChange={this.handleChange} />
                                </FormGroup>

                                <button type="button"
                                    className="btn btn-success" style={{ marginRight: '10px' }} onClick={this.cadastrar}>Cadastrar</button>
                                <button type="button"
                                    className="btn btn-danger" onClick={this.cancelar}>Cancelar</button>
                            </fieldset>

                        </Card>


                    </div>
                </div>

            </div>


        )
    }

}
export default withRouter(CadastroUsuario);