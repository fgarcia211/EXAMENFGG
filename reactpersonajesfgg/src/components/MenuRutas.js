import React, { Component } from 'react'

//Importamos axios para hacemos las llamadas get
//Importamos Global para acceder a la url principal
//Importamos NavLink para navegar con enlaces
import axios from 'axios';
import Global from "./../Global"
import { NavLink } from 'react-router-dom';

export default class MenuRutas extends Component {

    //Creamos state para recoger las series
    state = {
        series: [],
        status: false
    }

    //Funciones que se haran al cargar el componente
    componentDidMount = () => {
        this.cargaSeries();
    }

    //Funcion para añadir en el ul.dropdown-menu, los enlaces para mostrar cada serie
    cargaSeries = () => {

        //Preparamos la url apra el axios
        var request = "api/Series";
        var url = Global.urlPersonajes + request;

        //Hacemos el axios para recoger las series, y asignar como true el status de la llamada
        axios.get(url).then(res=>{
            this.setState({
                series: res.data,
                status: true
            })
        })
    }

    render() {
        return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
            <img className="navbar-brand" width="10%" height="10%" src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/9371.png" alt=""/>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to="/nuevopersonaje">Nuevo Personaje</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to="/editapersonaje">Edita Personaje</NavLink>
                </li>
                <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Series
                    </NavLink>
                    <ul className="dropdown-menu">
                    {/*Mostramos por cada serie recogida, un li donde tendremos un enlace, que nos redirigira a la ruta /muestraserie/idserie (Ver routes)*/}
                    {
                        this.state.series.map((serie, index) => {
                            return (<li key={index}><NavLink className="dropdown-item" to={"/muestraserie/" + serie.idSerie}>{serie.nombre}</NavLink></li>)
                        })
                    }
                    </ul>
                </li>
                </ul>
            </div>
            </div>
        </nav>
        )
    }
}
