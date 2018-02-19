import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  FlatList
} from 'react-native';

import Post from './Post';

export default class Feed extends Component {

  constructor(props){
    super(props);
    this.state = {
      fotos:[]
    }
  }

  componentDidMount(){
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/alots')
      .then(res => res.json())
      .then(fotos => this.setState({fotos}))
  }

  buscarPorId(id){
    return this.state.fotos.find(foto => foto.id === id);
  }

  atualizaFotos(fotoAtualizada){
    const fotos = this.state.fotos
    .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto);
    this.setState({fotos});
  }

  like(idFoto){
    const foto  = this.buscarPorId(idFoto);
    
    let novaLista = [];
    if(!foto.isLiked){
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

    this.atualizaFotos(fotoAtualizada);
  }

  adicionaComentario(idFoto, valorComentario, inputComentario){
    const foto  = this.buscarPorId(idFoto);

    if(valorComentario === '') return;

    const novaLista = [...foto.comentarios, {
        id:valorComentario,
        login:'meuUsuario',
        texto:valorComentario
    }];

    const fotoAtualizada = {
        ...foto,
        comentarios: novaLista
    };

    this.atualizaFotos(fotoAtualizada);
    inputComentario.clear();
  }

  render() {
    return (
      <FlatList style={styles.container}
      keyExtractor={item => item.id}
        data={this.state.fotos}
        renderItem={ ({item}) =>
          <Post foto={item} likeCallback={this.like.bind(this)} 
          comentarioCallback={this.adicionaComentario.bind(this)}/>
        }
      />
    );
  }
}

const margin = Platform.OS === 'ios' ? 20 : 0;
const styles = StyleSheet.create({
  container:{
    marginTop:margin
  }
});

