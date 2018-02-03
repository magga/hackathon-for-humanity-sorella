import React, { Component } from 'react';
import {
    ScrollView
} from 'react-native';

class Swiper extends Component {
    render() {
        return (
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 20 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
            >
                { this.props.children }
            </ScrollView>
        );
    }
}

module.exports = Swiper;
