import React from 'react'

import Login from '../views/Login'
import Home from '../views/Home'
import CadastroTarefas from '../views/CadastroTarefas'
import CadastroUsuario from '../views/CadastroUsuarios'
import ConsultaTarefas from '../views/ConsultaTarefas'
import { AuthConsumer } from './ProvedorAutenticacao'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'
import LandingPage from '../views/LandingPage'
function RotaAutenticada( { component: Component, isUsuarioAutenticado, ...props } ){
    return (
        <Route  {...props} render={ (componentProps) => {
            if(isUsuarioAutenticado){
                return (
                    <Component {...componentProps} />
                )
            }else{
                return(
                    <Redirect to={ {pathname : '/login', state : { from: componentProps.location } } } />
                )
            }
        }}  />
    )
}
function RotaAutenticadaLogin( { component: Component, isUsuarioAutenticado } ){
     if(isUsuarioAutenticado){
        return(<Redirect to={ {pathname : '/home'} } />)
    }else{
        return(<Component />)
    }
   
}

function Rotas(props){
    return (
        <HashRouter>
            <Switch>
                <RotaAutenticadaLogin isUsuarioAutenticado={props.isUsuarioAutenticado} path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                <Route exact path="/" component={LandingPage} />

                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-tarefas" component={ConsultaTarefas} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-tarefas" component={CadastroTarefas} />
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />) }
    </AuthConsumer>
)