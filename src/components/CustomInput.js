import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
} from 'react-native';

export default class CustomInput extends Component{

    render(){
        return (
            <TextInput style={styles.input} 
                placeholder={this.props.placeholder}
                autoCapitalize={this.props.capitalize}
                secureTextEntry={this.props.secure}
                onChangeText={this.props.onChange}
                underlineColorAndroid="transparent" />
        )
    }

}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
});