import logo from './logo.svg';
import './App.css';

//IMPORTAMOS TODOS LOS PAQUETES INSTALADOS Y EL COMPONENTE ROUTER
import Router from './Router'
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import "bootstrap/dist/js/bootstrap.bundle";

function App() {
  return (
    <div className="App">
      {/*Mostramos en la app, el component Router*/}
      <Router/>
    </div>
  );
}

export default App;
