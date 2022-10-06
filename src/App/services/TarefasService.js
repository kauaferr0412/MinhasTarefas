import ApiService from "../apiservice";


class TarefasService extends ApiService {
    constructor() {
        super('/api/tarefas')
    }

    salvar(objeto) {
        return this.post('/', objeto);
    }
    deletar(id) {
        return this.delete(`/${id}`)
    }

    editar(id, objeto) {
        return this.put(`?id=${id}`, objeto)
    }

    consultar(objeto) {

        let params = `?usuario=${objeto.usuario}`

        if (objeto.descricao) {
            params = `${params}&descricao=${objeto.descricao}`

        }


        if (objeto.concluido != null) {
            params = `${params}&concluido=${objeto.concluido}`

        }
        console.log(params)
        return this.get(params)
    }


}
export default TarefasService;