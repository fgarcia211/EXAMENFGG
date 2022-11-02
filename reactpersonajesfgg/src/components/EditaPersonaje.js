import React, { Component } from 'react'

//Importamos axios para hacemos las llamadas get y post
//Importamos Global para acceder a la url principal
//Importamos Navigate para redirigir una vez terminado el post
import axios from 'axios';
import Global from '../Global';
import { Navigate } from 'react-router-dom';

export default class EditaPersonaje extends Component {

    //Creamos las referencias para ambos select
    selectSerie = React.createRef();
    selectPersonaje = React.createRef();

    //Preparamos el state con los status de ambos get, y el put. Las series y personajes, y ademas el personaje y serie seleccionados en el select
    state = {
        statusGetSeries: false,
        statusGetPersonajes: false,
        statusPut: false,
        series: [],
        personajes: [],
        serieSele: [],
        personajeSele: []
    }

    //Funcion que cargamos al montar el component
    componentDidMount = () => {
        this.cargaPersonajes();
        this.cargaSeries();
    }

    //Funcion para cargar los personajes en el select
    cargaPersonajes = () => {

        //Prepraramos la url y hacemos llamada axios para fijar el statusgetpersonajes como true, y recoger los personajes
        var request = "api/Personajes"
        var url = Global.urlPersonajes + request;

        axios.get(url).then(res => {
            this.setState({
                personajes: res.data,
                statusGetPersonajes: true
            })
        })
    }

    //Funcion para cargas las series en el select
    cargaSeries = () => {

        //Prepraramos la url y hacemos llamada axios para fijar el statusgetseries como true, y recoger las series
        var request = "api/Series"
        var url = Global.urlPersonajes + request;

        axios.get(url).then(res => {
            this.setState({
                series: res.data,
                statusGetSeries: true
            })
        })
    }

    //Funcion para hacer el put con los datos del formulario
    enviaForm = (e) => {
        
        //Anulamos el evento
        e.preventDefault();

        //Preparamos la url y hacemos un axios, con un put, una vez hecho asignamos el statusput como true
        var request = "api/Personajes/" + this.selectPersonaje.current.value + "/" + this.selectSerie.current.value;
        var url = Global.urlPersonajes + request;

        axios.put(url).then(res=>{
            this.setState({
                statusPut: true,
            })
        })

    }

    //Funcion para mostrar en el div la serie seleccionada
    muestraSerieSele = (e) => {

        //Anulamos el evento, preparamos la url para el axios, y una vez hecho el axios, le asignamos cual es la serie seleccionada
        e.preventDefault();
        var request = "api/Series/" + this.selectSerie.current.value;
        var url = Global.urlPersonajes + request

        axios.get(url).then(res=>{
            console.log(res)
            this.setState({
                serieSele: res.data
            })

        })
        
    }

    //Funcion para mostrar en el div el personaje seleccionado
    muestraPersonajeSele = (e) => {

        //Anulamos el evento, preparamos la url para el axios, y una vez hecho el axios, le asignamos cual es la serie seleccionada
        e.preventDefault();

        var request = "api/Personajes/" + this.selectPersonaje.current.value;
        var url = Global.urlPersonajes + request

        axios.get(url).then(res=>{

            this.setState({
                personajeSele: res.data
            })

        })
        
    }


    render() {

        //Cuando se haga el put, redirigiremos a la serie donde hemos movido el personaje
        if (this.state.statusPut == true) {
            return (<Navigate to={"/personajes/"+this.selectSerie.current.value}/>)
        }

        return (
        <div>
            <h2 style={{color:"blue"}}>Series y personajes</h2>
            <form onSubmit={this.enviaForm}>
                <div className="mb-3 form-check">
                    <label className="form-label">Seleccione un personaje</label>
                    <select className="form-select" ref={this.selectPersonaje} onChange={this.muestraPersonajeSele}>
                            {
                                this.state.personajes.map((serie,index) => {
                                    return (<option key={index} value={serie.idPersonaje}>{serie.nombre}</option>)
                                })
                            }
                    </select>
                </div>
                <div className="mb-3 form-check">
                    <label className="form-label">Seleccione una serie</label>
                    <select className="form-select" ref={this.selectSerie} onChange={this.muestraSerieSele}>
                            {
                                this.state.series.map((serie,index) => {
                                    return (<option key={index} value={serie.idSerie}>{serie.nombre}</option>)
                                })
                            }
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Insertar personaje</button>
            </form>
            <br/>
            <br/>
            <div>
                <img alt="" width="150px" height="150px" src={this.state.serieSele.imagen}/>
                <p style={{color:"red"}}>{this.state.serieSele.nombre}</p>
            </div>
            <div>
                <img alt="" width="150px" height="150px" src={this.state.personajeSele.imagen}/>
                <p style={{color:"blue"}}>{this.state.personajeSele.nombre}</p>
            </div>
        </div>
        )
    }
}
