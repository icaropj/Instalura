/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  FlatList,
  Dimensions
} from 'react-native';

const width = Dimensions.get('screen').width;

export default class App extends Component<{}> {
  render() {
    const fotos = [
      {id:1, usuario:'rafael'}, 
      {id:2, usuario:'alberto'}, 
      {id:3, usuario:'vitor'}
    ];

    return (
      <FlatList
      keyExtractor={item => item.id}
        data={fotos}
        renderItem={ ({item}) =>
          <View>
            <View style={styles.cabecalho}>
              <Image source={require('./resources/img/s2-checked.png')}
                style={styles.fotoPerfil}/>
              <Text>{item.usuario}</Text>
            </View>
            <Image source={require('./resources/img/s2-checked.png')}
              style={styles.fotoPost}/>
          </View>
        }
      />
    );
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
