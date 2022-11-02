import React, { Component } from 'react'

//Importamos axios para hacemos las llamadas get y post
//Importamos Global para acceder a la url principal
//Importamos Navigate para redirigir una vez terminado el post
import axios from 'axios'
import Global from '../Global'
import { Navigate } from 'react-router-dom'

export default class NuevoPersonaje extends Component {

    //Declaramos las referencias de los elementos input y select del formulario
    cajaNombre = React.createRef();
    cajaImagen = React.createRef();
    selectSerie = React.createRef();

    //Preparamos un state, con la series que hay, los status del get y post como false, y el id de la serie a devolver una vez terminado el post
    state = {
        series: [],
        statusGet: false,
        statusPost: false,
        serieRet: 0
    }

    //Funcion que se realizara al cargar la pagina
    componentDidMount = () => {
        this.cargaSelect();
    }

    //Funcion que se usara para cargar el select del formulario con las series
    cargaSelect = () => {

        //Preparamos la url para hacer la llamada axios
        var request = "api/Series"
        var url = Global.urlPersonajes + request;
        
        //Hacemos un get para recoger las series y asignar el statusget como true
        axios.get(url).then(res => {
            this.setState({
                series: res.data,
                statusGet: true
            })
        })

    }

    //Funcion que se realiza una vez enviado el formulario
    enviaForm = (e) => {
        
        //Se anula el efecto del evento
        e.preventDefault();

        //Se prepara el objeto para enviar en el post con los parametros recogidos
        var objEnv = {
            idPersonaje: 1,
            nombre: this.cajaNombre.current.value,
            imagen: this.cajaImagen.current.value,
            idSerie: parseInt(this.selectSerie.current.value)
        }

        //Se prepara la url enviada en el axios
        var request = "api/Personajes/";
        var url = Global.urlPersonajes + request;

        //Se hace un post, para recoger el id a donde haremos un navigate, y ademas, ponemos el statuspost como true, para poder hacer el navigate
        axios.post(url, objEnv).then(res=>{
            this.setState({
                statusPost: true,
                serieRet: objEnv.idSerie
            })
        })
    }

    render() {

        //Cuando se haga el post, redirigeremos a la pagina, con la serie donde se ha insertado ese personaje
        if (this.state.statusPost == true) {
            return (<Navigate to={"/personajes/"+this.state.serieRet}/>)
        }

        return (
        <div>
            <form onSubmit={this.enviaForm}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" ref={this.cajaNombre}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Imagen</label>
                    <input type="text" className="form-control" ref={this.cajaImagen}/>
                </div>
                <div className="mb-3 form-check">
                    <label className="form-label">Serie</label>
                    <select className="form-select" ref={this.selectSerie}>
                        {/*Se mostrara por cada serie, una opcion con su key=index y el valor con su id*/}
                        {
                            this.state.series.map((serie,index) => {
                                return (<option key={index} value={serie.idSerie}>{serie.nombre}</option>)
                            })
                        }
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Insertar personaje</button>
            </form>
        </div>
        )
    }
}
