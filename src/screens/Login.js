import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    TouchableOpacity,
    TextInput,
    FlatList,
    Button,
    AsyncStorage
} from 'react-native';

import CustomInput from '../components/CustomInput';

const width = Dimensions.get('screen').width;

export default class Login extends Component {

    constructor(){
        super();
        this.state = {
            usuario:'',
            senha:'',
            mensagem:''
        }
    }

    efetuaLogin(){
        const uri = 'https://instalura-api.herokuapp.com/api/public/login';
        const requestInfo = {
            method:'POST',
            body: JSON.stringify({
                login:this.state.usuario,
                senha:this.state.senha
            }),
            headers: new Headers({
                'Content-Type':'application/json'
            })
        }
        
        fetch(uri, requestInfo)
            .then(response => {
                if(response.ok)
                    return response.text();

                throw new Error('Não foi possível efetuar o login.');
            })
            .then(token => {
                const usuario = {
                    nome: this.state.usuario,
                    token: token
                }
                AsyncStorage.setItem('usuario', JSON.stringify(usuario));
            })
            .catch(e => this.setState({mensagem: e.message}));
    }

    render(){
        return (
            <View style={styles.container}>

                <Text style={styles.titulo}>Instalura</Text>
                <View style={styles.form}>

                    <CustomInput placeholder="Usuário..."
                        onChange={texto => this.setState({usuario : texto})}
                        capitalize="none"/>

                    <CustomInput placeholder="Senha..."
                        onChange={texto => this.setState({senha : texto})}
                        capitalize="none" secure={true}/>

                    <Button title="Login"
                        onPress={this.efetuaLogin.bind(this)}/>

                </View>

                <Text style={styles.mensagem}>
                    {this.state.mensagem}
                </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo:{
      fontWeight: 'bold',
      fontSize: 26,  
    },
    form:{
        width:width * 0.8
    },
    mensagem:{
        marginTop:15,
        color: '#e74c3c'
    }
});