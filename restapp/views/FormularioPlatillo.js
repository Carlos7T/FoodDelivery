import React, {useContext, useState, useEffect} from 'react';
import {Alert} from 'react-native';
import{
    Container,
    Content,
    Form,
    Icon,
    Input,
    Grid,
    Col,
    Button,
    Text,
    Footer,
    FooterTab

    
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import PedidoContext from '../context/pedidos/pedidosContext';
import { camelCase } from 'lodash';
const FormularioPlatillo = () => {
    //State para cantidades
    const[cantidad, guardarCarntidad]= useState(1);
    const [total, guardarTotal]= useState(0);



    const {platillo, guardarPedido}= useContext(PedidoContext);
    const {precio}= platillo;

    //Redireccionar
    const navigation= useNavigation();


    //en cuanto el componente carga , calcular la cantidad a pagar
    useEffect(() => {
       calcularTotal();
    }, [cantidad])

    const calcularTotal=()=>{
        const totalPagar = precio*cantidad;
        guardarTotal(totalPagar);
    }

    //incrementa en uno
    const incrementarUno= ()=>{
        const nuevaCantidad = parseInt(cantidad) + 1;
        guardarCarntidad(nuevaCantidad);
    }
    //Decremento
    const decrementarUno = ()=>{
        if (cantidad > 1) {
            const nuevaCantidad = parseInt(cantidad) - 1;
            guardarCarntidad(nuevaCantidad);

            
        }
    }
    const confirmarOrden= ()=>{
        Alert.alert(
            '¿Desea confirmar tu pedido',
            'Un pedido confirmado ya no se podra modificar',
            [
                {
                    text: 'Confirmar',
                    onPress: ()=>{
                        //Almacenar el pedido principal
                        const pedido ={
                            ...platillo,
                            cantidad,
                            total
                        }
                        guardarPedido(pedido);

                        //Navegar hacia el Resumen
                        navigation.navigate("ResumenPedido");
                    },
                },
                    {
                        text: 'Cancelar',
                        style: 'cancel'
                    }

                
            ]

        )
    }

    



    return ( 
        <Container>
        <Content>
            <Form>
                <Text style={globalStyles.titulo}>Cantidad</Text>
                <Grid>
                    <Col>
                        <Button
                            props
                            dark
                            style={{ height: 80, justifyContent: 'center' }}
                            onPress={ () => decrementarUno() }
                        >
                            <Icon style={{ fontSize: 40 }} name="remove" />
                        </Button>
                    </Col>
                    <Col>
                        <Input
                            style={{ textAlign: 'center', fontSize: 20 }}
                            value={cantidad.toString() }
                            keyboardType="numeric"
                            onChangeText={ cantidad => guardarCantidad(cantidad) }
                        />
                    </Col>
                    <Col>
                        <Button
                            props
                            dark
                            style={{ height: 80, justifyContent: 'center' }}
                            onPress={ () => incrementarUno() }
                        >
                            <Icon style={{ fontSize: 40 }} name="add" />
                        </Button>
                    </Col>
                </Grid>

                <Text style={globalStyles.cantidad}>Subtotal: $ {total} </Text>
            </Form>
        </Content>

        <Footer>
            <FooterTab>
                <Button
                    style={globalStyles.boton}
                    onPress={ () => confirmarOrden() }
                >
                    <Text style={globalStyles.botonTexto}>Agregar al Pedido</Text>
                </Button>
            </FooterTab>
        </Footer>
    </Container>
 );

}
 
export default FormularioPlatillo;