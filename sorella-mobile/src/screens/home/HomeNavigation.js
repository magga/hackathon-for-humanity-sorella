import React, { Component } from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import SideMenu from './../others/SideMenu';
import colors from './../../constants/Colors';
import TabIcon from './../others/TabIcon';

import HomeScreen from './HomeScreen';
import ViharaScreen from './ViharaScreen';

const tabBarOptions = {
    activeTintColor: colors.txtMainRed,
    inactiveTintColor: colors.txtDark,
    style: {
        backgroundColor: colors.bgWhite,
        height: 55
    },
    labelStyle: {
        fontWeight: '700',
        marginBottom: 10,
        fontSize: 8
    }
};

const TabIndexNavigator = TabNavigator({
    home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'HOME',
            tabBarIcon: ({ tintColor }) => (
                <TabIcon name='home' color={tintColor} />
            )
        }
    },
    vihara: {
        screen: ViharaScreen,
        navigationOptions: {
            tabBarLabel: 'VIHARA',
            tabBarIcon: ({ tintColor }) => (
                <TabIcon name='location-pin' color={tintColor} />
            )
        }
    }
}, {
    tabBarOptions,
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true
});

class HomeNavigation extends Component {
    static navigationOptions = {
        gesturesEnabled: false
    }

    onMenuPress = () => {
        this.refs.menu.onMenuPress();
    }

    render() {
        const screenProps = {
            onMenuPress: this.onMenuPress
        };

        return (
            <SideMenu ref="menu" navigation={this.props.navigation}>
                <TabIndexNavigator screenProps={screenProps} />
            </SideMenu>
        );
    }
}

export default HomeNavigation;
