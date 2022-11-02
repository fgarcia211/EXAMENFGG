import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global'
import { NavLink } from 'react-router-dom'

export default class MuestraSerie extends Component {

    //Creamos un state para recoger la serie seleccionada por props, y para comprobar el status
    state = {
        serie: [],
        status: false
    }

    //Funcion que se realiza al cargar la pagina
    componentDidMount = () => {
        this.cargaSerie()
    }

    //Funcion que se realiza para recoger los datos de la serie seleccionada y mostrarlos en el render
    cargaSerie = () => {

        //Preparamos la url para realizar la llamada axios
        var request = "api/Series/" + this.props.idserie
        var url = Global.urlPersonajes + request

        //Hacemos get para recoger la serie y asignar el status como true
        axios.get(url).then(res=>{
            this.setState({
                serie: res.data,
                status: true
            })
        })

    }

    render() {
        return (
        <div className="card" style={{"width":"50%" , "alignContent":"center"}}>
            <img src={this.state.serie.imagen} className="card-img-top" alt="..."/>
            <div className="card-body">
            <h5 className="card-title">{this.state.serie.nombre}</h5>
            <p className="card-text">IMDB: {this.state.serie.puntuacion}</p>
            <NavLink to={"/personajes/"+this.state.serie.idSerie} className="btn btn-success">Personajes</NavLink>
            </div>
        </div>
        )
    }
}
