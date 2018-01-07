import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  FlatList
} from 'react-native';

import Post from './src/components/Post';

export default class App extends Component {

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

  render() {
    return (
      <FlatList
      keyExtractor={item => item.id}
        data={this.state.fotos}
        renderItem={ ({item}) =>
          <Post foto={item}/>
        }
      />
    );
  }
}


