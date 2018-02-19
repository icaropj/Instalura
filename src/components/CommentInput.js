import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    TextInput,
} from 'react-native';

export default class CommentInput extends Component {

    constructor(props){
        super(props);
        this.state = {
            valorComentario: ''
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <TextInput style={styles.novoComentario}
                    placeholder={"Adicione um comentário"}
                    ref={input => this.inputComentario = input}
                    onChangeText={texto => this.setState({valorComentario: texto})}
                    underlineColorAndroid="transparent"/>

                <TouchableOpacity onPress={() =>{
                    this.props.comentarioCallback(this.props.idFoto, 
                        this.state.valorComentario, this.inputComentario);
                    this.setState({valorComentario: ''})
                }}>
                    <Image style={styles.novoComentarioIcone} 
                        source={require('../../resources/img/send.png')}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    novoComentario:{
        flex:1,
        height:40
    },
    novoComentarioIcone:{
        width:30,
        height:30
    }
});

