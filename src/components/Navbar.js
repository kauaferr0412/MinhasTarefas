import React from "react";
import NavBarItem from "./NavBarItem";
import { AuthConsumer } from '../main/ProvedorAutenticacao'
function NavBar(props) {
  
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >
            <div className="container">
                <a href="#/home" className="navbar-brand">ATIVIDADES</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                       <NavBarItem render={props.render} label="Home" link="#/home" />
                       <NavBarItem render={props.render} label="Tarefas" link="#/consulta-tarefas" />
                       <NavBarItem render={props.render} label="Sair" link="#/login" logout={props.logout}/>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default ()=>(
    <AuthConsumer>
        {(context) =>(<NavBar render={context.isAutenticado} logout={context.encerrarSessao}/>)}
    </AuthConsumer>
)
