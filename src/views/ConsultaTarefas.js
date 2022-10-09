
import { withRouter } from 'react-router-dom'
import Card from "../components/card";
import FormGroup from "../components/form-group.js";
import Tabela from "../components/tarefasTable";
import TarefasService from "../App/services/TarefasService";
import LocalStorageService from "../App/services/localStorageService";
import { Dialog } from 'primereact/dialog';
import React from 'react';
import { Toast } from 'primereact/toast';
import '../resources/style.css'
import { RadioButton } from 'primereact/radiobutton';

class ConsultaTarefas extends React.Component {

    constructor() {
        super();
        this.service = new TarefasService();
    }
    state = {
        descricao: '',
        concluido: null,
        mostrarDialog: false,
        mostrarDialogEditar: false,
        tarefasEditar: {},
        tarefas: [],
        carregar: false,
        idEditar: null,
        descricaoEditar: '',
        concluidoEditar: false,
        usuarioEditar: null,
    }
    anulaCamposDelecao = () => {
        this.setState({ mostrarDialog: false, tarefasEditar: {} })
    }
    anularCamposEdicao = () => {
        this.setState({
            idEditar: null,
            descricaoEditar: null,
            concluidoEditar: null,
            usuarioEditar: null,
            mostrarDialogEditar: false
        })
    }
    montartarefaConsulta = () => {
        return {
            usuario: LocalStorageService.pegarDaSessao('_usuarioLogado_').id,
            descricao: this.state.descricao,
            concluido: this.state.concluido
        }

    }
    montartarefaEditar = () => {
        return {
            id: this.state.idEditar,
            concluido: this.state.concluidoEditar,
            descricao: this.state.descricaoEditar,
            usuario: this.state.usuarioEditar.id
        }
    }
    prepararEditar = (tarefa) => {

        this.props.history.push(`/cadastro-tarefas/${tarefa.id}`)
        this.setState({
            idEditar: tarefa.id,
            descricaoEditar: tarefa.descricao,
            concluidoEditar: tarefa.concluido,
            usuarioEditar: tarefa.usuario,
            mostrarDialogEditar: true

        })
        this.mostrarDialogEditar()

    }
    prepararDeletar = (tarefa) => { this.setState({ mostrarDialog: true, tarefasEditar: tarefa }) }

    carregar = () => { this.setState({ carregar: true }) }
    encerrar = () => this.setState({ carregar: false })
    showSuccess = (mensagem) => { this.toast.show({ severity: 'success', summary: null, detail: mensagem, life: 3000 }) }
    showError = (mensagem) => { this.toast.show({ severity: 'error', summary: null, detail: mensagem, life: 3000 }) }
    mudarDescricao(valor) { this.setState({ descricao: valor }) }
    mudarTarefas(valor) { this.setState({ tarefas: valor }) }
    naoMostrarDialogDeletar = () => { this.setState({ mostrarDialog: false }) }
    naoMostrarDialogEditar = () => { this.setState({ mostrarDialogEditar: false }) }
    mostrarDialogEditar = () => { this.setState({ mostrarDialogEditar: true }) }
    prepararCadastro = () => { this.props.history.push('/cadastro-tarefas') }

    handleChange = (event) => {
        const valor = event.target.value;
        const nome = event.target.name;

        this.setState({ [nome]: valor });
    }
    //--------------------------------------------------------------------------------------------

    deletar = () => {
        this.carregar()
        this.service.deletar(this.state.tarefasEditar.id).then(resposta => {
            this.consultar()
            this.showSuccess('Atividade deletada com sucesso!!');
            this.anulaCamposDelecao()
        }).catch(erro => {
            this.showError(erro.response.data)
        }).finally(final => {
            this.encerrar()

        })
    }
    //--------------------------------------------------------------------------------------------
    consultar = () => {
        this.carregar()
        const tarefa = this.montartarefaConsulta()
        this.service.consultar(tarefa)
            .then(resposta => {
                console.log(resposta.data)
                this.mudarTarefas(resposta.data)
            }).catch(erro => {
                this.showError(erro.response.data)
            }).finally(final => {
                this.encerrar()
            })
    }
    //--------------------------------------------------------------------------------------------

    editar = () => {
        this.carregar()
        const tarefa = this.montartarefaEditar();
        this.service.editar(tarefa.id, tarefa)
            .then(resposta => {
                this.consultar()
                this.anularCamposEdicao()
                this.showSuccess('Atividade editada com sucesso!!')
            }).catch(erro => {
                this.showError(erro.response.data)
            }).finally(final => {
                this.encerrar()
            })
    }
    //--------------------------------------------------------------------------------------------

    render() {
        const footerDeletar = (
            <div>
                <button type="button" className="btn btn-sucess" onClick={this.deletar}>
                    Sim
                </button>
                <button type="button" className="btn btn-danger" onClick={this.naoMostrarDialogDeletar}>
                    Não
                </button>
            </div>
        );

        const footerEditar = (
            <div>
                <button type="button" className="btn btn-sucess" onClick={this.editar}>Editar</button>
                <button type="button" className="btn btn-danger"
                    onClick={this.naoMostrarDialogEditar}>Cancelar</button>
            </div>


        );
        const message = (
            <Toast ref={(el) => this.toast = el} />
        )

        const loading = (
            <Dialog draggable={false} position="center" modal={true} visible={this.state.carregar} className="loading" header='Carregando...'
                onHide={e => { this.setState({ carregar: false }) }} closable={false}>
            </Dialog>
        )

        return (
            <div>

                <Card title='Consulta Tarefas'>
                    {message}
                    {loading}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <FormGroup htmlFor="inputDescricao" label="Descrição:">
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputDescricao"
                                            value={this.state.descricao}
                                            name="descricao"
                                            onChange={this.handleChange}
                                            style={{ marginBottom: '20px' }} />
                                    </div >
                                </FormGroup>

                                <FormGroup style={{ marginBottom: '20px' }}>
                                    <div className="field-radiobutton" style={{ float: 'left', marginRight: '50px' }}>
                                        <RadioButton name="todos" id="todos"
                                            onChange={(e) => this.setState({ concluido: null })}
                                            checked={this.state.concluido === null} />
                                        <label style={{ marginTop: '5px' }} htmlFor="todos">Todos</label>
                                    </div>
                                    <div className="field-radiobutton" style={{ float: 'left', marginRight: '50px' }}>
                                        <RadioButton name="concluido" id="concluido"
                                            onChange={(e) => this.setState({ concluido: true })}
                                            checked={this.state.concluido === true} />
                                        <label style={{ marginTop: '5px' }} htmlFor="concluido">Concluído</label>

                                    </div>
                                    <div className="field-radiobutton" style={{ float: 'left', marginRight: '50px' }}>
                                        <RadioButton name="naoConcluido" id="naoConcluido"
                                            onChange={(e) => this.setState({ concluido: false })}
                                            checked={this.state.concluido === false} />
                                        <label style={{ marginTop: '5px' }} htmlFor="naoConcluido">Não concluído</label>
                                    </div>
                                </FormGroup>
                                <button type="button" className="btn btn-success"
                                    style={{ marginRight: '10px' }} onClick={this.consultar}>Buscar</button>
                                <button type="button" className="btn btn-danger" onClick={this.prepararCadastro}>Cadastrar</button>
                            </div>
                        </div>
                    </div>

                    <div className="row" style={{ marginTop: '50px' }}>
                        <div className="col-md-12">
                            <div className="bs-component">
                                <Tabela lista={this.state.tarefas} deletar={this.prepararDeletar} editar={this.prepararEditar} />
                            </div>
                        </div>
                    </div>

                    <Dialog draggable={false} position="top" header="Editar Lançamento" footer={footerEditar} modal={true} visible={this.state.mostrarDialogEditar} style={{ width: '50vw' }}
                        onHide={e => { this.setState({ mostrarDialogEditar: false }) }}>
                        <div className="row">
                            <div className="col-md-12">
                                <FormGroup id="inputDescricao" label="Descrição: *">
                                    <input id="inputDescricao" type="text"
                                        name="descricaoEditar"
                                        value={this.state.descricaoEditar}
                                        onChange={this.handleChange}
                                        className="form-control" />
                                </FormGroup>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <FormGroup style={{ marginBottom: '20px' }}>
                                    <div className="field-radiobutton" style={{ float: 'left', marginRight: '50px' }}>
                                        <RadioButton name="concluido" id="concluido"
                                            onChange={(e) => this.setState({ concluidoEditar: true })}
                                            checked={this.state.concluidoEditar === true} />
                                        <label style={{ marginTop: '5px' }} htmlFor="concluido">Concluído</label>

                                    </div>
                                    <div className="field-radiobutton" style={{ float: 'left', marginRight: '50px' }}>
                                        <RadioButton name="naoConcluido" id="naoConcluido"
                                            onChange={(e) => this.setState({ concluidoEditar: false })}
                                            checked={this.state.concluidoEditar === false} />
                                        <label style={{ marginTop: '5px' }} htmlFor="naoConcluido">Não concluído</label>
                                    </div>
                                </FormGroup>
                            </div>

                        </div>
                    </Dialog>

                    <Dialog draggable={false} position="top" header="Deletar Atividade" footer={footerDeletar} modal={true} visible={this.state.mostrarDialog} style={{ width: '50vw' }}
                        onHide={e => { this.setState({ mostrarDialog: false }) }}>
                        <p>DESEJA MESMO DELETAR ESSA ATIVIDADE??</p>
                    </Dialog>


                </Card>
            </div>
        )

    }
}

export default withRouter(ConsultaTarefas);