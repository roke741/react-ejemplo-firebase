import React,{useState, useEffect} from 'react';
import MarcoForm from './MarcoForm';
import {bd} from '../firebase';
import { setDoc,collection,doc,getDocs, updateDoc,deleteDoc } from '@firebase/firestore';
import { toast } from 'react-toastify';

const MarcoLista = () => {
    //Registrar o Actualizar 
    const [idActual, setIdActual] = useState('');

    const agregarOeditarTarea = async (objParaBD) => {
        
        const querySnapshot = await getDocs(collection(bd,'registro'));
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                //console.log(`${doc.id} => ${doc.data()}`);
            });
        try {
            //Registrar
            if(idActual ===""){
                const newCityRef = doc(collection(bd,'registro'));
                await setDoc(newCityRef,objParaBD);
                //await addDoc(collection(bd,objParaBD));
                //await bd.collection('registro').doc('datos').set(objParaBD);
                //console.log("Registra en BD... objParaBD");
                console.log(objParaBD);
                console.log("Se registro con exito...");
                toast("Se registro con exito...",{
                    type:'info',
                    autoClose: 2000
                    }
                );
            }else{
                //Actualizar
                //console.log("Actualizar en BD... objParaBD");
                //console.log("Se actualizo con exito...");
                await updateDoc(doc(bd,'registro',idActual), objParaBD);
                //await updateDoc(doc(collection(bd,'registro'),idActual),objParaBD);
                obtenerDatos();
                toast("Se actualizo con exito...",{
                    type:'info',
                    autoClose: 2000
                }
                );
            }
            setIdActual('');
        }catch(error) {
            console.error(error);
        }
    }
    //lectura de datos de BD
    const [docsBD,setDocsBD] = useState([]);
    useEffect(() => {
        obtenerDatos();
    },[]);


    const obtenerDatos = async () => {
        const xDatosBD = await getDocs(collection(bd,'registro'));
        const xDoc = [];
        xDatosBD.forEach(doc => {
            console.log(doc.data());
            xDoc.push({...doc.data(),id:doc.id});
        });
        setDocsBD(xDoc);
    };


    const eliminarDocumento = async (id) => {
        if(window.confirm('Estas seguro de eliminar?  '+ id)){
            await deleteDoc(doc(collection(bd,'registro'),id));
            toast("Se elimino con exito...",{
                type:'info',
                autoClose: 2000
                }
            );
        }
        setIdActual('');
        obtenerDatos();
    }; 
    


    return(
        <div>
            <div className="col-md-12 p-2">
                <MarcoForm {...{agregarOeditarTarea, idActual, docsBD}}/>
            </div>
            <div className="col-md-12 p-2">

                {docsBD.map(xDocs => (
                    <div className="card mb-1" key={xDocs.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4>{xDocs.nombre}</h4>
                                <div className="btns">
                                    <i className="material-icons text-danger"
                                    onClick={()=> eliminarDocumento(xDocs.id)}>close</i>
                                    <i className="material-icons text-warning"
                                    onClick={()=> setIdActual(xDocs.id)}>create</i>
                                </div>
                            </div>
                            <p>{xDocs.descripcion}</p>
                            <a href={xDocs.url} rel="noreferrer" target="_blank"> {xDocs.url} </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default MarcoLista;