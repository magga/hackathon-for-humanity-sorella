import React, { Component } from 'react';
import {
    View, StyleSheet, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from './../constants/Colors';
import Text from './../components/form/Text';

class ListPanel extends Component {
    static defaultProps = {
        description: ''
    }

    render() {
        const headerLeftPartStyle = (this.props.description) ? { justifyContent: 'center' } : { flexDirection: 'row', alignItems: 'center' };

        return (
            <View>
                <View style={styles.holder}>
                    <View style={styles.header}>
                        <View style={headerLeftPartStyle}>
                            <Text style={styles.title} type='h5'>{ this.props.title }</Text>
                            <Text>{ this.props.description }</Text>
                        </View>
                        {
                            !this.props.hideSeeAll &&
                            <TouchableOpacity onPress={this.props.onPressSeeAll} style={styles.headerRightPart}>
                                <Text style={{ marginRight: 10 }}>Lihat Semua</Text>
                                <Icon style={styles.icon} name='angle-right' size={23} />
                            </TouchableOpacity>
                        }
                    </View>

                    { this.props.children }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    holder: {
        flexDirection: 'column',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: colors.bdLine
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingVertical: 20
    },
    headerRightPart: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        color: colors.txtDark
    },
    title: {
        fontWeight: '700'
    }
});

module.exports = ListPanel;
