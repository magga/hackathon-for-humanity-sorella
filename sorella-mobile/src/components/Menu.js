import React, { Component } from 'react';
import {
    StyleSheet, TouchableOpacity, View, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import Text from './form/Text';
import colors from './../constants/Colors';
import * as actions from './../actions';

const SideMenuWidth = 250;

class Menu extends Component {
    alertLogOut() {
        Alert.alert(
            'Log Out',
            'Apakah Anda yakin?',
            [
                { text: 'TIDAK' },
                { text: 'YA', onPress: () => { this.logOut(); } }
            ]
        );
    }

    logOut() {
        this.props.logOut(() => {
            this.props.navigation.goBack();
        });
    }

    render() {
        return (
            <View style={[styles.sideMenu, this.props.style || {}]}>
                <Text type='h1White' style={[styles.sideMenuTitle, this.props.titleStyle || {}]}>Menu</Text>
                <View style={{ width: 170 }}>
                    <TouchableOpacity style={[styles.menu, { backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 30 }]}>
                        <Icon name='home' color={colors.txtWhite} size={24} />
                        <Text style={styles.menuText} type='h5White'>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menu}>
                        <Icon name='user-o' color={colors.txtWhite} size={24} />
                        <Text style={styles.menuText} type='h5White'>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menu}>
                        <Icon name='cog' color={colors.txtWhite} size={24} />
                        <Text style={styles.menuText} type='h5White'>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menu}>
                        <Icon name='bell-o' color={colors.txtWhite} size={24} />
                        <Text style={styles.menuText} type='h5White'>Notification</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menu} onPress={this.alertLogOut.bind(this)}>
                        <Icon name='sign-out' color={colors.txtWhite} size={24} />
                        <Text style={styles.menuText} type='h5White'>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sideMenu: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: SideMenuWidth,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        marginLeft: 30
    },
    sideMenuTitle: {
        marginLeft: 20,
        marginBottom: 30
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    menuText: {
        marginLeft: 20
    }
});

export default connect(null, actions)(Menu);
