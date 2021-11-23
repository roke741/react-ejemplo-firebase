import React,{useEffect, useState} from 'react';
import {getDoc,doc} from '@firebase/firestore';
import { bd } from '../firebase';
import { toast } from 'react-toastify';


const MarcoForm = (props) => {
    //Valores iniciales del formulario
    const valoresIniciales = {url:"", nombre:"", descripcion:""}; //valores iniciales
    const [valores,setValores] = useState(valoresIniciales); //asigna a estado
    //manejador de envio submit del formulario
    const manejarEnvio = (e) => {
        e.preventDefault();

        if(!validarURL(valores.url)){
            return toast("No es valido el URL",{
                type:"error",
                autoClose:1500
            });
        }

        props.agregarOeditarTarea(valores);
        setValores({...valoresIniciales});
    }
    const validarURL = (cadena) => {
        return /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i.test(cadena);
    }


    //manejador de cambios en el formulario
    const manejarCambiosEntrada = (e) => { //handleInputChange
        const {name,value} = e.target;
        setValores({...valores,[name]: value});
    }
    
    //actualizar datos por id
    useEffect(
        async() => {
            if(props.idActual ===''){
                setValores({...valoresIniciales});
            }else{
                const docRef = doc(bd,'registro', (props.idActual));
                const docBD = await getDoc(docRef);
                setValores(docBD.data());
            }
        } ,[props.idActual]);

    return (
        <form className="card card-body " onSubmit={manejarEnvio}>
            <div className="form-group input-group">
                <div className="input-group-text bg-dark">
                    <i className="material-icons">insert_link</i>
                </div>
                <input type="text" className="form-control" placeholder="https://" name="url"
                    onChange={manejarCambiosEntrada}
                    value={valores.url}
                />
            </div>
            <br/>
            <div className="form-group input-group">
                <div className="input-group-text bg-dark" >
                    <i className="material-icons">create</i>
                </div>
                <input type="text" className="form-control" placeholder="Nombre del sitio" name="nombre"
                    onChange={manejarCambiosEntrada}
                    value={valores.nombre}
                />
            </div>
            <br/>
            <div className="form-group">
                <textarea row="3" className="form-control" placeholder="Describa..." name="descripcion"
                    onChange={manejarCambiosEntrada}
                    value={valores.descripcion}
                >
                </textarea>
            </div>
            <br/>
            <button className="btn btn-primary btn-block d-flex align-items-center justify-content-center">
                <i className="material-icons">save</i><span> 
                    {props.idActual==='' ? 'Guardar' : 'Actualizar'}
                </span>
            </button>
        </form>
    )
}
export default MarcoForm;
