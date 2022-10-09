import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group.js";
import TarefasService from "../App/services/TarefasService";
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import LocalStorageService from "../App/services/localStorageService";
import { RadioButton } from 'primereact/radiobutton';

export default class CadastroTarefas extends React.Component {

    constructor() {
        super();
        this.service = new TarefasService();

    }

    state = {
        id: null,
        descricao: '',
        concluido: false,
        lancamento: {}

    }

    componentDidMount(){
        const params = this.props.match.params
        console.log(params)
        if(params.id != null){
            this.service.pegarPorId(params.id).then(resposta =>{
                this.setState({id: resposta.data.id, descricao: resposta.data.descricao, concluido: resposta.data.concluido})
            }).catch(erro =>{
                this.showError(erro.response.data)

            })
        }
    }

    salvar = () => {
        //DESCONSTRÓI O ELEMENTO QUE VC PASSAR E TRANSFORMA TUDO EM VARIAVEIS SEPARADAS
        this.carregar()

        const {id, descricao, concluido } = this.state
        const tarefa = {id, descricao, concluido, usuario: LocalStorageService.pegarDaSessao('_usuarioLogado_').id }

        this.service.salvar(tarefa).then(resposta => {
            this.showSuccess('Tarefa cadastrada com sucesso!!')
            this.resetarCampos()
            this.props.history.push('/consulta-tarefas')
        }).catch(erro => {
            this.showError(erro.response.data)

        }).finally(e => {
            this.encerrar()
        })
    }

    handleChange = (event) => {
        const valor = event.target.value;
        const nome = event.target.name;
        this.setState({ [nome]: valor });
    }

    resetarCampos = () => { this.setState({ id: null, descricao: '', ano: '', valor: '', mes: '', tipo: '' }) }
    showSuccess = (mensagem) => { this.toast.show({ severity: 'success', summary: mensagem, detail: null, life: 3000 }) }
    showError = (mensagem) => { this.toast.show({ severity: 'error', summary: mensagem, detail: null, life: 3000 }); }
    cancelar = () => { this.props.history.push('/consulta-tarefas') }
    carregar = () => { this.setState({ carregar: true }) }
    encerrar = () => { this.setState({ carregar: false }) }

    render() {
        const message = (
            <Toast ref={(el) => this.toast = el} />
        )

        const loading = (
            <Dialog draggable={false} position="center" modal={true} visible={this.state.carregar} className="loading" header='Carregando...'
                onHide={e => { this.setState({ carregar: false }) }} closable={false}>
            </Dialog>
        )
        return (
            <div >
                {message}
                <div className="row">
                    <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                        <Card title="Cadastro Tarefas">
                            {loading}
                            {message}
                            <div className="row">
                                <div className="col-md-12">
                                    <FormGroup id="inputDescricao" label="Descrição: *">
                                        <input id="inputDescricao" type="text"
                                            name="descricao" value={this.state.descricao} onChange={this.handleChange} className="form-control" />
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="row">
                                <FormGroup style={{ marginBottom: '20px' }}>
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
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <button type="button"
                                        className="btn btn-success" style={{ marginRight: '10px' }} onClick={this.salvar}>Cadastrar</button>
                                    <button type="button"
                                        className="btn btn-danger" onClick={this.cancelar}>Cancelar</button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

        )
    }
}
