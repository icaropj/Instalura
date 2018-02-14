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
    FlatList
} from 'react-native';
import CommentInput from './CommentInput';
import Likes from './Likes';

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

    exibeLegenda(foto){
        if(foto.comentario === '') return;

        return (
            <View style={styles.comentario}>
                <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
                <Text>{foto.comentario}</Text>
            </View>
        )
    }

    adicionaComentario(valorComentario, inputComentario){
        if(valorComentario === '') return;

        const novaLista = [...this.state.foto.comentarios, {
            id:valorComentario,
            login:'meuUsuario',
            texto:valorComentario
        }];

        const fotoAtualizada = {
            ...this.state.foto,
            comentarios: novaLista
        };

        this.setState({foto: fotoAtualizada});
        inputComentario.clear();
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
                    <Likes likeCallback={this.like.bind(this)} foto={foto}/>

                    {this.exibeLegenda(foto)}

                    <FlatList
                        data={foto.comentarios}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => 
                        <View style={styles.comentario}>
                            <Text style={styles.tituloComentario}>{item.login}</Text>
                            <Text>{item.texto}</Text>
                        </View>
                        }/>

                    <CommentInput comentarioCallback={this.adicionaComentario.bind(this)}/>
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
    rodape:{
        margin: 10
    },
    comentario:{
        flexDirection:'row'
    },
    tituloComentario:{
        fontWeight: 'bold',
        marginRight: 5
    }
  })