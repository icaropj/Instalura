import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions
} from 'react-native';

const width = Dimensions.get('screen').width;

export default class Post extends Component {

    render(){
        return (
            <View>
                <View style={styles.cabecalho}>
                <Image source={{uri: this.props.item.urlPerfil}}
                    style={styles.fotoPerfil}/>
                <Text>{this.props.item.loginUsuario}</Text>
                </View>
                <Image source={{uri:this.props.item.urlFoto}}
                style={styles.fotoPost}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cabecalho:{
      margin:10, 
      flexDirection: 'row', 
      alignItems:'center'
    },
    fotoPerfil:{
      marginRight:10, 
      borderRadius:20 , 
      width:40, 
      height:40
    },
    fotoPost:{
      width:width, 
      height:width
    }
  })