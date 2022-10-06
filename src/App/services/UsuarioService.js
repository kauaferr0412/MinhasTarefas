import ApiService from "../apiservice";

class UsuarioService extends ApiService{
    constructor(){
        super('/api/usuarios')
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }

    obterTotalTarefasConcluidasENaoConcluidas(id){
        return this.get(`/total?usuario=${id}`)
    }

    cadastrar(objeto){
        return this.post('/salvar', objeto)
    }
}
export default UsuarioService