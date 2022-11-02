import React, { Component } from 'react'

//Importamos axios para hacemos las llamadas get
//Importamos Global para acceder a la url principal
//Importamos NavLink para navegar con enlaces
import axios from 'axios'
import Global from '../Global'
import { NavLink } from 'react-router-dom'

export default class MuestraPersonajes extends Component {

    //Declaramos state para comprobar el status y recoger los personajes que pertenezcan a la serie pasada por props
    state = {
        personajes: [],
        status: false
    }

    //Funcion que se hara al cargar el componente
    componentDidMount = () => {
        this.cargaPersonajes();
    }

    //Funcion para recoger los personajes
    cargaPersonajes = () => {

        //Declaramos la url para acceder a los personajes de la serie pasada por props
        var request = "api/Series/PersonajesSerie/" + this.props.idserie;
        var url = Global.urlPersonajes + request;

        //Hacemos llamada axios y asignamos el status como true, y los personajes, como los datos de la respuesta
        axios.get(url).then(res=> {
            this.setState({
                personajes: res.data,
                status: true
            })
        })

    }
    render() {
        return (
        <div>
            {/*Asignamos un NavLink para volver a la serie que se mostraba antes de acceder a los personajes*/}
            <NavLink className="btn btn-danger" to={"/muestraserie/"+this.props.idserie}>Volver</NavLink>
            <br/><br/>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Personaje</th>
                        <th scope="col">Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    {/*Por cada personaje que haya, preparamos un tr con el nombre del personaje, y una imagen*/}
                    {
                        this.state.personajes.map((personaje,index) => {
                            return (<tr key={index}>
                                <td>{personaje.nombre}</td>
                                <td><img width="150px" height="150px" src={personaje.imagen} alt=""/></td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
        )
    }
}
