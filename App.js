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
  Dimensions
} from 'react-native';

const width = Dimensions.get('screen').width;

export default class App extends Component<{}> {
  render() {
    return (
      <View>
        <Text>icaro</Text>
        <Image source={require('./resources/img/s2-checked.png')}
          style={{width:width, height:width}}/>
      </View>
    );
  }
}
