import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Picker
} from 'react-native';
// import Icon from 'react-native-vector-icons/Octicons';
import { Icon } from 'native-base';

import colors from './../../constants/Colors';

class InputPicker extends Component {
    state = {
        selectedValue: this.props.selectedValue
    }

    onValueChange = (selectedValue) => {
        this.setState({ selectedValue });
        this.props.onValueChange(selectedValue);
    }

    render() {
        return (
            <View style={[styles.defaultHolder, this.props.holderStyle || {}]}>
                <Text style={[styles.defaultTxt, this.props.titleStyle || {}]}>{ this.props.title }</Text>
                <View style={styles.inputHolder}>
                    <Picker
                        selectedValue={this.state.selectedValue}
                        onValueChange={this.onValueChange}
                        style={styles.default}
                    >
                        { this.props.children }
                    </Picker>

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

export default InputPicker;
