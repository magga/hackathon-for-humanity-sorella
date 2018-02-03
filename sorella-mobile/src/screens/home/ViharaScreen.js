import React, { Component } from 'react';
import {
    StyleSheet, ListView, View, TouchableOpacity
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import Container from './../../components/Container';
import Text from './../../components/form/Text';
import ThumbSingleItemWithPrice from './../../components/thumbs/SingleItemWithPrice';
import items from './../../data/homes';
import colors from './../../constants/Colors';

class ViharaScreen extends Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            dataSource: ds.cloneWithRows(items)
        };
    }

    renderRow = (rowData) => {
        return (
            <ThumbSingleItemWithPrice style={styles.thumb} data={rowData} />
        );
    }

    renderNavBar() {
        return (
            <View style={styles.navBar}>
                <TouchableOpacity onPress={this.props.screenProps.onMenuPress}>
                    <FAIcon name='bars' size={22} style={{ color: colors.txtWhite }} />
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <Container>
                {this.renderNavBar()}
                <ListView
                    style={styles.holder}
                    renderHeader={() => <Text style={styles.screenTitle} type='h1'>Vihara</Text>}
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    removeClippedSubviews={false}
                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    headerLeftIconStyle: {
        color: colors.txtDark
    },
    screenTitle: {
        fontWeight: '700',
        paddingVertical: 30
    },
    holder: {
        paddingHorizontal: 25,
        flex: 1
    },
    thumb: {
        marginVertical: 20,
        marginHorizontal: 0
    },
    navBar: {
        height: 50,
        justifyContent: 'center',
        backgroundColor: colors.bgMainRed,
        paddingHorizontal: 25
    }
});

export default ViharaScreen;
