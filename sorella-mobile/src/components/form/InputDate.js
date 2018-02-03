import React, { Component } from 'react';
import {
    StyleSheet, Text, View, TextInput
} from 'react-native';
// import Icon from 'react-native-vector-icons/Octicons';
import { Icon } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';


import colors from './../../constants/Colors';
import Button from './Button';
import { formattingDate } from './../../helper';

class InputDate extends Component {
    state = {
        isDateTimePickerVisible: false,
        dateStr: ''
    };

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        const dateStr = formattingDate(date);
        this.setState({ dateStr });
        this.props.onPress(dateStr);
        this._hideDateTimePicker();
    };

    render() {
        return (
            <View style={[styles.defaultHolder, this.props.holderStyle || {}]}>
                <Text style={[styles.defaultTxt, this.props.titleStyle || {}]}>{ this.props.title }</Text>
                <View style={styles.inputHolder}>
                    <TextInput
                        underlineColorAndroid='rgba(0,0,0,0)'
                        style={styles.default} 
                        editable={false}
                        value={this.state.dateStr}
                    />
                    <Button
                        style={styles.defaultButton}
                        title='Pilih Tanggal'
                        titleStyle={styles.buttonText}
                        onPress={this._showDateTimePicker}
                    />

                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                    />

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
    default: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        color: colors.txtWhite,
        fontWeight: '700',
        flex: 1
    },
    defaultButton: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    buttonText: {
        flex: 1,
        textAlign: 'center',
        color: colors.txtWhite,
        fontSize: 15,
        fontWeight: '700'
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

export default InputDate;
