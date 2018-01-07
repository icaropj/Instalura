import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';

const width = Dimensions.get('screen').width;

export default class Post extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            foto: this.props.foto
        };
    }

    like(){
        const { foto } = this.state;

        let novaLista = [];
        if(!this.state.foto.isLiked){
            novaLista = [
                ...foto.likers,
                {login:'meuUsuario'}
            ]
        }else{
            novaLista = foto.likers.filter(liker => {
                return liker.login !== 'meuUsuario'
            })
        }

        const fotoAtualizada = {
            ...foto,
            isLiked: !foto.isLiked,
            likers: novaLista
        }
        this.setState({foto:fotoAtualizada});
    }

    carregaIcone(isLiked){
        return isLiked ? require('../../resources/img/s2-checked.png') : 
            require('../../resources/img/s2.png')
    }

    exibeLikes(likers){
        if(likers.length <= 0) return ;
        return(
            <Text style={styles.likes}>
                {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
            </Text>
        )
    }

    exibeLegenda(foto){
        if(foto.comentario === '') return;

        return (
            <View style={styles.comentario}>
                <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
                <Text>{foto.comentario}</Text>
            </View>
        )
    }

    render(){
        const { foto } = this.state;

        return (
            <View>
                <View style={styles.cabecalho}>
                <Image source={{uri: foto.urlPerfil}}
                    style={styles.fotoPerfil}/>
                <Text>{foto.loginUsuario}</Text>
                </View>
                <Image source={{uri:foto.urlFoto}}
                style={styles.fotoPost}/>

                <View style={styles.rodape}>
                    <TouchableOpacity 
                        onPress={this.like.bind(this)}>
                        <Image style={styles.botaoLike} 
                            source={this.carregaIcone(foto.isLiked)}/>
                    </TouchableOpacity>
                    
                    {this.exibeLikes(foto.likers)}

                    {this.exibeLegenda(foto)}
                    {foto.comentarios.map(comentario => 
                        <View style={styles.comentario} key={comentario.id}>
                            <Text style={styles.tituloComentario}>{comentario.login}</Text>
                            <Text>{comentario.texto}</Text>
                        </View>
                    )}
                </View>
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
    },
    botaoLike:{
        width:30,
        height:30,
        marginBottom:10
    },
    rodape:{
        margin: 10
    },
    likes:{
        fontWeight: 'bold'
    },
    comentario:{
        flexDirection:'row'
    },
    tituloComentario:{
        fontWeight: 'bold',
        marginRight: 5
    }
  })