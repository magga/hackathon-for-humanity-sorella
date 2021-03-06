import React, { Component } from 'react';
import {
    View, StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import Text from './../../components/form/Text';
import colors from './../../constants/Colors';
import SingleItem from './SingleItem';

class SingleItemWithPrice extends Component {
    render() {
        const data = this.props.data;

        return (
            <SingleItem data={data} style={[styles.holder, this.props.style || {}]} overlay>
                <Icon name='heart' size={20} style={styles.icon} />
                <View style={styles.priceHolder}>
                    <Text style={styles.prize} type='spanWhite'>{ data.prize }</Text>
                </View>
            </SingleItem>
        );
    }
}

const styles = StyleSheet.create({
    holder: {
        paddingVertical: 0,
        borderBottomWidth: 0,
        marginHorizontal: 5
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 10,
        backgroundColor: 'transparent',
        color: colors.txtWhite,
        zIndex: 2
    },
    priceHolder: {
        position: 'absolute',
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: 'rgba(0,0,0, 0.8)',
        left: 0,
        bottom: 75
    },
    prize: {
        fontWeight: '700'
    }
});

module.exports = SingleItemWithPrice;
