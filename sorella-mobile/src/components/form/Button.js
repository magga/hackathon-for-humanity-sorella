import React, { Component } from 'react';
import {
    TouchableOpacity, StyleSheet, Text, Image
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import colors from './../../constants/Colors';

class Button extends Component {
    render() {
        const type = this.props.type || {};
        const txtType = `${type}Txt`;

        return (
            <TouchableOpacity onPress={this.props.onPress} style={[styles.default, styles[type], this.props.style || {}]}>
                { type === 'facebook' && <Icon style={[styles.defaultTxt, styles[txtType], this.props.titleStyle || {}]} name='social-facebook' size={20} /> }
                { type === 'submit' && <Icon style={[styles.defaultTxt, styles[txtType], this.props.titleStyle || {}]} name='arrow-right' size={20} /> }
                { type === 'line' && <Image style={[styles.defaultTxt, styles[txtType], this.props.titleStyle || {}]} source={require('./../../img/logo-pemuda.png')} /> }
                <Text style={[styles.defaultTxt, styles[txtType], this.props.titleStyle || {}]}>{ this.props.title }</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    // Border button type by default
    default: {
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: colors.bdWhite,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    defaultTxt: {
        color: colors.txtWhite,
        fontSize: 20
    },
    facebook: {
        backgroundColor: colors.bgWhite
    },
    facebookTxt: {
        color: colors.txtMain
    },
    line: {
        backgroundColor: '#00C300'
    },
    lineTxt: {
        color: '#00C300',
        width: 50,
        height: 50
    },
    // Button with background color
    submit: {
        backgroundColor: colors.bgWhite,
        width: 50
    },
    submitTxt: {
        color: colors.txtMain
    },
    borderMain: {
        borderColor: colors.bdMain,
        borderRadius: 5,
        paddingHorizontal: 25
    },
    borderMainTxt: {
        color: colors.txtMain
    }
});

module.exports = Button;
