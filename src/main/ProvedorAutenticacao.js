import React from "react";
import LocalStorageService from "../App/services/localStorageService";
export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer
export const AuthProvider = AuthContext.Provider
export const USUARIO_LOGADO = '_usuarioLogado_'
export const LOGADO = 'logado'
export default class ProvedorAutenticacao extends React.Component {
    state = {
        usuarioAutenticado: LocalStorageService.pegarDaSessao(USUARIO_LOGADO),
        isAutenticado: LocalStorageService.pegarDaSessao(LOGADO)

    }
    iniciarSessao = (usuario) => {
        console.log(usuario)
        LocalStorageService.adicionarNaSessao(USUARIO_LOGADO, JSON.stringify(usuario))
        LocalStorageService.adicionarNaSessao(LOGADO, true)

        this.setState({ isAutenticado: LocalStorageService.pegarDaSessao(LOGADO), usuarioAutenticado: usuario })
    }

    encerrarSessao = () => {
        LocalStorageService.removerNaSessao(USUARIO_LOGADO)
        LocalStorageService.adicionarNaSessao(LOGADO, false)

        this.setState({isAutenticado: LocalStorageService.pegarDaSessao(LOGADO), usuarioAutenticado: null})

    }
    render() {
        const contexto = {
            usuarioAutenticado: this.state.usuarioAutenticado,
            isAutenticado: this.state.isAutenticado,
            iniciarSessao: this.iniciarSessao,
            encerrarSessao: this.encerrarSessao
        }
        return (
            <AuthProvider value={contexto}>
                {this.props.children}
            </AuthProvider>
        )
    }
}