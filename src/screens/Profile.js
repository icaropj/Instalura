import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class Profile extends Component {

    constructor(){
        super();
        this.state = {
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>
                    Profile
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
    }
});