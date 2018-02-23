import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  FlatList,
  AsyncStorage
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
    const uri = 'http://10.0.2.2:8080/api/fotos';

    AsyncStorage.getItem('usuario')
      .then(usuario => {
        const token = JSON.parse(usuario).token;
        return {
          headers: new Headers({'X-AUTH-TOKEN': token})
        }
      })
      .then(requestInfo => fetch(uri, requestInfo))
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
    
    AsyncStorage.getItem('usuario')
      .then(usuario => {
        const usuarioLogado = JSON.parse(usuario).nome;

        let novaLista = [];
        if(!foto.likeada){
            novaLista = [
                ...foto.likers,
                {login:usuarioLogado}
            ]
        }else{
            novaLista = foto.likers.filter(liker => {
                return liker.login !== usuarioLogado
            })
        }

        return novaLista;
      }).then(novaLista => {
        const fotoAtualizada = {
          ...foto,
          likeada: !foto.likeada,
          likers: novaLista
        }
        this.atualizaFotos(fotoAtualizada);
      
      });

      const uri = `http://10.0.2.2:8080/api/fotos/${idFoto}/like`;
      AsyncStorage.getItem('usuario')
      .then(usuario => {
        const token = JSON.parse(usuario).token;
        return {
          method:'POST',
          headers: new Headers({'X-AUTH-TOKEN': token})
        }
      })
      .then(requestInfo => fetch(uri, requestInfo))
  }

  adicionaComentario(idFoto, valorComentario, inputComentario){
    if(valorComentario === '') return;
    
    const foto  = this.buscarPorId(idFoto);

    const uri = `http://10.0.2.2:8080/api/fotos/${idFoto}/comment`;
    
    AsyncStorage.getItem('usuario')
      .then(usuario => {
        const token = JSON.parse(usuario).token;

        return {
          method:'POST',
          body:JSON.stringify({
            texto:valorComentario
          }),
          headers:new Headers({
            'Content-Type':'application/json',
            'X-AUTH-TOKEN':token
          })
        }
      })
      .then(requestInfo => fetch(uri, requestInfo))
      .then(resposta => resposta.json())
      .then(comentario => [...foto.comentarios, comentario])
      .then(novaLista => {
        const fotoAtualizada = {
          ...foto,
          comentarios: novaLista
        };
    
        this.atualizaFotos(fotoAtualizada);
        inputComentario.clear();
      });
  }

  render() {
    return (
      <FlatList 
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


