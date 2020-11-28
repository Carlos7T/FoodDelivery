import React, {useReducer}  from 'react';
import firebase from '../../firebase';
import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';
import {OBTENER_PRODUCTOS} from '../../types/index';
import _ from 'lodash';

const FirebaseState = props =>{
    //console.log(firebase);
    //Crear el state inicial
    const initialState ={
        menu:[]
    }
    //useReducer con dispatch para ejecutar las funciones 
    const [state, dispath]= useReducer(FirebaseReducer, initialState);
    //FUNCION PARA TRAER LOS PRODUCTOS
    const obtenerProductos = ()=>{
        
        //Consultar firebase
        firebase.db.settings({ experimentalForceLongPolling: true });
        firebase.db
        .collection('productos')
        .where('existencia', '==', true) //traer solo en existencia
        .onSnapshot(manejarSnapshot);
        function manejarSnapshot(snapshot){
            let platillos = snapshot.docs.map(doc =>{
                return{
                    id: doc.id,
                    ...doc.data()
                }
            });
            //ordenar por categoria con lodash
            platillos = _.sortBy(platillos, 'categoria');
           //Tenemos resultados de la base de datos 
           dispath({
            type: OBTENER_PRODUCTOS,
            payload: platillos
        });

        }
        
    }
    return(
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                firebase,
                obtenerProductos
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}
export default FirebaseState;
