import ApiService from "../apiservice";


class TarefasService extends ApiService{
    constructor(){
        super('/api/tarefas')
    }

    obterListaMes(){
        const lista = [
            { label: 'Selecione', valor: '' },
            { label: 'Janeiro', valor: 1 },
            { label: 'Fevereiro', valor: 2 },
            { label: 'Março', valor: 3 },
            { label: 'Abril', valor: 4 },
            { label: 'Maio', valor: 5 },
            { label: 'Junho', valor: 6 },
            { label: 'Julho', valor: 7 },
            { label: 'Agosto', valor: 8 },
            { label: 'Setembro', valor: 9 },
            { label: 'Outubro', valor: 10 },
            { label: 'Novembro', valor: 11 },
            { label: 'Dezembro', valor: 12 },
        ]

        return lista
    }

    obterListaTipo(){
        return [
            { label: 'Selecione', valor: '' },
            { label: 'Despesa', valor: 'DESPESA' },
            { label: 'Receita', valor: 'RECEITA' },
        ]
    }

    salvar(objeto){
        return this.post('/', objeto);
    }
    deletar(id){
        return this.delete(`/${id}`)
    }

    editar(id, objeto){
        return this.put(`?id=${id}`, objeto )
    }

    consultar(objeto){

        let params = `?usuario=${objeto.usuario}`

        if(objeto.descricao){
            params= `${params}&descricao=${objeto.descricao}`

        }

        
        if(objeto.concluido != null){
            params= `${params}&concluido=${objeto.concluido}`

        }
        console.log(params)
        return this.get(params)
    }

    
}
export default TarefasService;