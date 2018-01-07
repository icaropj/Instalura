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
      <ScrollView>
        {fotos.map(foto => 
          <View key={foto.id}>
            <Text>{foto.usuario}</Text>
            <Image source={require('./resources/img/s2-checked.png')}
              style={{width:width, height:width}}/>
          </View>
        )}
      </ScrollView>
    );
  }
}
