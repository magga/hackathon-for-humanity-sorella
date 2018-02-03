import React, { Component } from 'react';
import {
    TextInput, StyleSheet, Text, View
} from 'react-native';
// import Icon from 'react-native-vector-icons/Octicons';
import { Icon } from 'native-base';

import colors from './../../constants/Colors';

class Input extends Component {
    renderTextInput(type, typeProps) {
        if (this.props.value) {
            return (
                <TextInput
                    onChangeText={this.props.onChangeText}
                    {...typeProps}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    style={[styles.default, styles[type], this.props.style || {}]} 
                    editable={this.props.editable || true}
                    value={this.props.value}
                />
            );
        }

        return (
            <TextInput
                onChangeText={this.props.onChangeText}
                {...typeProps}
                underlineColorAndroid='rgba(0,0,0,0)'
                style={[styles.default, styles[type], this.props.style || {}]} 
                editable={this.props.editable || true}
            />
        );
    }

    render() {
        const type = this.props.type || {};
        let typeProps;

        switch (type) {
            case 'email':
                typeProps = {
                    autoCapitalize: 'none',
                    autoCorrect: false,
                    keyboardType: 'email-address',
                    returnKeyType: 'next'
                };
                break;
            case 'password':
                typeProps = {
                    secureTextEntry: true
                };
                break;
            case 'numeric':
                typeProps = {
                    autoCorrect: false,
                    keyboardType: 'numeric',
                    returnKeyType: 'next'
                };
                break;
            default:
                typeProps = {
                    autoCapitalize: 'words',
                    autoCorrect: false,
                    keyboardType: 'default',
                    returnKeyType: 'next'
                };
                break;
        }

        return (
            <View style={[styles.defaultHolder, this.props.holderStyle || {}]}>
                <Text style={[styles.defaultTxt, this.props.titleStyle || {}]}>{ this.props.title }</Text>
                <View style={styles.inputHolder}>
                    {this.renderTextInput(type, typeProps)}

                    { this.props.valid 
                        ? <Icon name='ios-checkmark' size={20} style={styles.validIcon} /> 
                        : <Icon name='ios-close' size={20} style={styles.invalidIcon} />
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // Border button type by default
    default: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        color: colors.txtWhite,
        fontWeight: '700',
        flex: 1
    },
    defaultTxt: {
        color: colors.txtWhite,
        fontWeight: '700'
    },
    defaultHolder: {
        borderBottomWidth: 1,
        borderColor: colors.bdWhite
    },
    inputHolder: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    validIcon: {
        color: colors.txtWhite,
        paddingLeft: 10
    },
    invalidIcon: {
        color: colors.txtWhite,
        paddingLeft: 10
    }
});

module.exports = Input;
