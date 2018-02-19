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
    Button
} from 'react-native';

const width = Dimensions.get('screen').width;

export default class Login extends Component {

    render(){
        return (
            <View style={styles.container}>

                <Text style={styles.titulo}>Instalura</Text>
                <View style={styles.form}>

                    <TextInput style={styles.input} placeholder="Usuário..."
                        onChangeText={texto => this.setState({usuario : texto})}
                        underlineColorAndroid="transparent"/>

                    <TextInput style={styles.input} placeholder="Senha..."
                        onChangeText={texto => this.setState({senha : texto})}
                        underlineColorAndroid="transparent"/>

                    <Button title="Login"
                        onPress={() => console.warn('Login')}/>
                </View>

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
    input: {
        height:40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    }
});