class LocalStorageService{

    static adicionarNaSessao(chave , objeto){
        localStorage.setItem(chave, objeto)
    }

    static removerNaSessao(){
        localStorage.removeItem('_usuarioLogado_')
    }

    static pegarDaSessao(chave){
        return JSON.parse( localStorage.getItem(chave))
    }
}
export default LocalStorageService
