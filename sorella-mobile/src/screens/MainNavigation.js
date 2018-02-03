import { StackNavigator } from 'react-navigation';

import WelcomeScreen from './welcome/WelcomeScreen';
import LoginOptionScreen from './welcome/LoginScreen';
import HomeNavigation from './home/HomeNavigation';

export default new StackNavigator({
    welcome: { screen: WelcomeScreen },
    login: { screen: LoginOptionScreen },
    homeTab: { screen: HomeNavigation }
}, {
    headerMode: 'none'
});
