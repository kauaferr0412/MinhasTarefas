import React from "react";
import 'bootswatch/dist/materia/bootstrap.css'
import Rotas from './Rotas'
import '../resources/style.css'
import NavBar from '../components/Navbar'
import 'toastr/build/toastr.min.js'
import 'toastr/build/toastr.css'
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import ProvedorAutenticacao from './ProvedorAutenticacao'
class App extends React.Component {

  render() {

    return (

      <ProvedorAutenticacao >
        <NavBar />

        <div className="container">

          <Rotas />

        </div>

      </ProvedorAutenticacao>
    )
  }
}

export default App;
