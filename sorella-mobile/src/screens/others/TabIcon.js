import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

class TabIcon extends Component {
    render() {
        return (
            <Icon {...this.props} style={{ marginBottom: -5 }} size={22} />
        );
    }
}

export default TabIcon;
