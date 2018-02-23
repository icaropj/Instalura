import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from 'react-native';
import App from './App';
import Login from './src/screens/Login';
import Feed from './src/components/Feed';

Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Feed', () => Feed);

AsyncStorage.getItem('token')
    .then(token => {

        if(token) {
            return {
                screen:'Feed',
                title:'Instalura'
            };
        }

        return {
            screen:'Login',
            title:'Login'
        };
    })
    .then(screen => Navigation.startSingleScreenApp({screen}));


