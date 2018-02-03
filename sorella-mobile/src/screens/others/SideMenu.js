import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Animated } from 'react-native';
import Interactable from 'react-native-interactable';

import Menu from './../../components/Menu';
import colors from './../../constants/Colors';

const Screen = Dimensions.get('window');
const SideMenuWidth = 250;

export default class SideMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuOpened: false
        };

        this.deltaX = new Animated.Value(0);
    }

    onStopInteraction(event) {
        let menuOpened = true;

        if (event.nativeEvent.x === 0) {
            menuOpened = !menuOpened;
        }

        this.setState(() => {
            return { menuOpened };
        });
    }

    onMenuPress = () => {
        const menuOpened = !this.state.menuOpened;

        if (menuOpened) {
            this.refs.menuInstance.snapTo({ index: 1 });
        } else {
            this.refs.menuInstance.snapTo({ index: 0 });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View 
                    style={{ 
                        width: SideMenuWidth, 
                        height: Screen.height, 
                        position: 'absolute', 
                        transform: [
                            {
                                translateX: this.deltaX.interpolate({
                                    inputRange: [0, SideMenuWidth],
                                    outputRange: [-SideMenuWidth, 0]
                                })
                            }
                        ],
                        opacity: this.deltaX.interpolate({
                            inputRange: [0, 0.1, SideMenuWidth],
                            outputRange: [0, 1, 1]
                        })
                    }}
                >
                    <Menu navigation={this.props.navigation} />
                </Animated.View>

                <Interactable.View
                    style={{ flex: 1 }}
                    ref='menuInstance'
                    horizontalOnly
                    snapPoints={[{ x: 0, tension: 230 }, { x: SideMenuWidth, tension: 230 }]}
                    boundaries={{ right: SideMenuWidth, left: 0 }}
                    initialPosition={{ x: 0 }}
                    onStop={this.onStopInteraction.bind(this)}
                    animatedValueX={this.deltaX}
                >
                    <Animated.View 
                        style={{ 
                            flex: 1, 
                            transform: [
                                {
                                    scale: this.deltaX.interpolate({
                                        inputRange: [0, SideMenuWidth],
                                        outputRange: [1, 0.8]
                                    })
                                }
                            ]
                        }}
                    >
                        { this.props.children }
                    </Animated.View>
                </Interactable.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: colors.bgMainDark,
    }
});
