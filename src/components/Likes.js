import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    FlatList
} from 'react-native';

export default class Likes extends Component {

    carregaIcone(isLiked){
        return isLiked ? require('../../resources/img/s2-checked.png') : 
            require('../../resources/img/s2.png')
    }

    exibeLikes(likers){
        if(likers.length <= 0) return ;
        return(
            <Text style={styles.likes}>
                {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
            </Text>
        )
    }

    render(){
        const { likeCallback, foto } = this.props;
        return(
            <View>
                <TouchableOpacity 
                    onPress={() => {likeCallback(foto.id)}}>
                    <Image style={styles.botaoLike} 
                        source={this.carregaIcone(foto.isLiked)}/>
                </TouchableOpacity>

                {this.exibeLikes(foto.likers)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    botaoLike:{
        width:30,
        height:30,
        marginBottom:10
    },
    likes:{
        fontWeight: 'bold'
    },
});
