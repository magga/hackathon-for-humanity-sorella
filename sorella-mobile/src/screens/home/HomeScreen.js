import React, { Component } from 'react';
import {
    StyleSheet, View, ScrollView, Dimensions, TouchableOpacity, BackHandler
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Thumbnail } from 'native-base';
import { connect } from 'react-redux';

import Container from './../../components/Container';
import Swiper from './../../components/Swiper';
import ListPanel from './../../components/ListPanel';
import Text from './../../components/form/Text';
import Button from './../../components/form/Button';
import ThumbSingleItemWithPrice from './../../components/thumbs/SingleItemWithPrice';
import ThumbDestination from './../../components/thumbs/Destination';
import colors from './../../constants/Colors';
import exploreData from './../../data/explore';

const { width } = Dimensions.get('window');

class HomeScreen extends Component {
    onPressSeeAll(index) {
        // this.props.navigation.navigate(index);
    }

    onPressItinerary = () => {
        this.props.navigation.navigate('kta');
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });
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

    renderHeader() {
        return (
            <View style={styles.headerHolder}>
                {/* <Icon name='rocket' size={60} style={styles.logo} /> */}
                <Thumbnail source={{ uri: this.props.user.line.profile.pictureURL }} style={{ width: 100, height: 100 }} />
                <Text type='h3White' style={[styles.siteName, { fontSize: 15, marginTop: 10 }]}>{this.props.user.line.profile.statusMessage}</Text>
                <Text type='h3White' style={styles.siteName}>Selamat Datang Kembali, {this.props.user.line.profile.displayName}</Text>
                <Button
                    onPress={this.onPressItinerary}
                    titleStyle={styles.btnHeaderTitleStyle}
                    style={styles.btnHeader}
                    title='HELP!' 
                />
            </View>
        );
    }

    renderHomeList() {
        const itemThumbs = (
            exploreData.homes.map((item) => {
                return (
                    <ThumbSingleItemWithPrice key={item.id} data={item} />
                );
            })
        );

        return (
            <ListPanel
                title='Berita Terbaru'
                onPressSeeAll={this.onPressSeeAll.bind(this, 'Homes')}
            >
                <Swiper>
                    { itemThumbs }
                </Swiper>
            </ListPanel>
        );
    }

    renderFeaturedDestinations() {
        const itemThumbs = (
            exploreData.destinations.map((item) => {
                return (
                    <ThumbDestination key={item.id} data={item} />
                );
            })
        );

        return (
            <ListPanel
                hideSeeAll
                title='Kegiatan'
            >
                <Swiper>
                    { itemThumbs }
                </Swiper>
            </ListPanel>
        );
    }

    renderPlaces() {
        const thumbWidth = width / 3;
        const itemThumbs = (
            exploreData.places.map((item) => {
                return (
                    <ThumbDestination width={thumbWidth} key={item.id} data={item} />
                );
            })
        );

        return (
            <ListPanel
                title='Vihara Tridharma'
                onPressSeeAll={this.onPressSeeAll.bind(this, 'Places')}
            >
                <Swiper>
                    { itemThumbs }
                </Swiper>
            </ListPanel>
        );
    }

    render() {
        return (
            <Container statusBarStyle={styles.statusBarStyle}>
                { this.renderNavBar() }
                <ScrollView>
                    { this.renderHeader() }
                    { this.renderHomeList() }
                    { this.renderFeaturedDestinations() }
                    { this.renderPlaces() }
                </ScrollView>
            </Container>
        );
    }
}

const styText = { color: colors.txtWhite };
const styles = StyleSheet.create({
    statusBarStyle: {
        backgroundColor: colors.bgMainRed
    },
    navBar: {
        height: 50,
        justifyContent: 'center',
        backgroundColor: colors.bgMainRed,
        paddingHorizontal: 25
    },
    headerHolder: {
        padding: 25,
        backgroundColor: colors.bgMainRed
    },
    logo: {
        ...styText,
        marginTop: 10
    },
    siteName: {
        marginTop: 30,
        flex: 1
    },
    btnHeader: {
        width: 160,
        height: 40,
        marginVertical: 70,
        borderWidth: 2
    },
    btnHeaderTitleStyle: {
        fontSize: 14,
        fontWeight: '700'
    }
});

const mapStateToProps = (state) => {
    return ({
        user: state.user
    });
};

export default connect(mapStateToProps)(HomeScreen);
