import React, { Component } from 'react';
import {
    View, Image, StyleSheet, Dimensions, TouchableOpacity
} from 'react-native';

import Text from './../form/Text';

class SingleItem extends Component {
    renderImage() {
        const data = this.props.data;
        const imgWidth = (this.props.width) ? this.props.width : Dimensions.get('window').width / 4;
        const imgHeight = imgWidth * data.ratio;

        if (typeof data.thumb === 'string') {
            return (
                <Image style={{ width: imgWidth, height: imgHeight }} source={{ uri: data.thumb }} />
            );
        }

        return (
            <Image style={{ width: imgWidth, height: imgHeight }} source={data.thumb} />
        );
    }

    render() {
        const data = this.props.data;
        const imgWidth = (this.props.width) ? this.props.width : Dimensions.get('window').width / 4;

        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={[styles.holder, this.props.style || {}]}>
                    { this.renderImage() }
                    <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.name, { width: imgWidth }]}>{ data.name }</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    name: {
        fontWeight: '700',
        paddingTop: 5
    },
    holder: {
        marginHorizontal: 5
    }
});

module.exports = SingleItem;
