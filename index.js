import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from 'react-native';
import App from './App';
import Login from './src/screens/Login';
import Profile from './src/screens/Profile';
import Feed from './src/components/Feed';

Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Profile', () => Profile);
Navigation.registerComponent('Feed', () => Feed);

AsyncStorage.getItem('token')
    .then(token => {

        if(token) {
            
            Navigation.startTabBasedApp({
                tabs: [{
                  title: 'Instalura',
                  screen: 'Feed',
                  label: 'Feed',
                  icon: require('./resources/img/s2.png')
                }, {
                  title: 'Meu Perfil',
                  screen: 'Profile',
                  label: 'Profile',
                  icon: require('./resources/img/s2.png')
                }]
            });
            return;
        }

        Navigation.startSingleScreenApp({
            screen:'Login',
            title:'Login'
        });
        // return ;
    })
    // .then(screen => Navigation.startSingleScreenApp({screen}));


