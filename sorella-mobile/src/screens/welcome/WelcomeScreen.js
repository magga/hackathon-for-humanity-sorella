import React, { Component } from 'react';
import _ from 'lodash';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import Slides from './../../components/Slides';
import colors from './../../constants/Colors';

const SLIDE_DATA = [
    { text: 'Welcome to Sorella App', color: colors.COLOR_1 },
    { text: 'Join Sorella with your LINE Account', color: colors.COLOR_2 }
];

class WelcomeScreen extends Component {
    onSlidesComplete = () => {
        this.props.navigation.navigate('login');
    }

    componentWillMount() {
        this.first = true;
        this.checkUser(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.first) {
            this.first = false;
            this.checkUser(nextProps);
        }
    }

    checkUser(props) {
        if (props.user && props.user.line) {
            props.navigation.navigate('homeTab');
        }
    }

    render() {
        return (
            <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        user: state.user
    });
};

export default connect(mapStateToProps)(WelcomeScreen);
