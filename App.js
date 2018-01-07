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

export default class App extends Component<{}> {
  render() {
    const fotos = [
      {id:1, usuario:'icaro'}, 
      {id:2, usuario:'alberto'}, 
      {id:3, usuario:'vitor'}
    ];

    return (
      <FlatList
      keyExtractor={item => item.id}
        data={fotos}
        renderItem={ ({item}) =>
          <Post item={item}/>
        }
      />
    );
  }
}


