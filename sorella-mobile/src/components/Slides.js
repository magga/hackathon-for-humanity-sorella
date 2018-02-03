import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button, Icon } from 'native-base';

import colors from './../constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
    renderLastSlide(index) {
        if (index === this.props.data.length - 1) {
            return (
                <Button
                    iconLeft
                    style={{ backgroundColor: colors.COLOR_2, marginTop: 10, width: 150, alignSelf: 'center' }}
                    onPress={this.props.onComplete}
                >
                    <Icon name='ios-fastforward' />
                    <Text style={styles.textButtonStyle}>I'm Ready</Text>
                </Button>
            );
        }
    }

    renderSlides() {
        return this.props.data.map((slide, index) => {
            return (
                <View 
                    style={[styles.slideStyle, { backgroundColor: slide.color }]}
                    key={index}
                >
                    <Text style={styles.textStyle}>{slide.text}</Text>
                    {this.renderLastSlide(index)}
                </View>
            );
        });
    }
    render() {
        return (
            <ScrollView
                horizontal
                style={{ flex: 1 }}
                pagingEnabled
            >
                {this.renderSlides()}
            </ScrollView>
        );
    }
}

const styles = {
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    textStyle: {
        fontSize: 30,
        textAlign: 'center',
        color: 'white',
        marginLeft: 10,
        marginRight: 10
    },
    textButtonStyle: { 
        textAlign: 'center', 
        flex: 1, 
        color: colors.COLOR_LIGHT
    },
    buttonStyle: {
        backgroundColor: '#0288D1'
    }
};

export default Slides;
