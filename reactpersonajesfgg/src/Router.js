import React, { Component } from 'react'

//IMPORTAMOS TODOS LOS COMPONENTES DE LA CARPETA COMPONENTS, Y ADEMAS BROWSERROUTER, ROUTES, ROUTES, Y USEPARAMS, DE REACT-ROUTER-DOM
import { BrowserRouter , Routes, Route, useParams } from 'react-router-dom'
import MenuRutas from './components/MenuRutas'
import Home from './components/Home'
import MuestraSerie from './components/MuestraSerie'
import MuestraPersonajes from './components/MuestraPersonajes'
import NuevoPersonaje from './components/NuevoPersonaje'
import EditaPersonaje from './components/EditaPersonaje'

export default class Router extends Component {

  render() {

    //FUNCION PARA PASAR PARAMETROS AL COMPONENT MUESTRASERIE
    function MuestraSerieParam() {

        var { idserie } = useParams();
        return (<MuestraSerie idserie={idserie}/>)

    }

    //FUNCION PARA PASAR PARAMETROS AL COMPONENT MUESTRAPERSONAJES
    function MuestraPersonajesParam() {

        var { idserie } = useParams();
        return (<MuestraPersonajes idserie={idserie}/>)

    }
    
    return (
      <BrowserRouter>
        {/*Añadimos el component MenuRutas para mostrar la barra de navegacion*/}
        <MenuRutas/>
        {/*Añadimos el component Routes para mostrar el contenido de la ruta seleccionada*/}
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/muestraserie/:idserie" element={<MuestraSerieParam/>}/>
            <Route path="/personajes/:idserie" element={<MuestraPersonajesParam/>}/>
            <Route path="/nuevopersonaje" element={<NuevoPersonaje/>}/>
            <Route path="/editapersonaje" element={<EditaPersonaje/>}/>
        </Routes>
      </BrowserRouter>
    )
  }

}
