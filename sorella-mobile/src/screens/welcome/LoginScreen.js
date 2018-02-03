import React, { Component } from 'react';
import {
    StyleSheet, TouchableOpacity, View, ScrollView, Image
} from 'react-native';
import { Button } from 'native-base';
import LineLogin from 'react-native-line-sdk';
import firebase from 'firebase';
import { connect } from 'react-redux';

import Container from './../../components/Container';
import Text from './../../components/form/Text';
import colors from './../../constants/Colors';
import * as actions from './../../actions';

class LoginScreen extends Component {
    onLogin() {
        LineLogin.login()
            .then((user) => {
                console.log(user);
                this.fetchUserProfile(user);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    fetchUserProfile(user) {
        const ref = firebase.database().ref(`users/${user.profile.userID}`);
    
        ref.child('line').set(user)
            .then(() => {
                ref.on('value', (snapshot) => {
                    ref.off();
                    
                    const profile = snapshot.val();

                    console.log(profile);
        
                    this.props.saveUser(profile);

                    this.props.navigation.navigate('homeTab');
                });
            });
    }

    renderHeaderRight() {
        return (
            <TouchableOpacity onPress={this.onPress} style={{ paddingRight: 25 }}>
                <Text type='h5White'>Log in</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <Container style={styles.container}>
                <ScrollView>
                    <View style={styles.holder}>
                        <Image source={require('./../../img/logo-pemuda.png')} style={{ width: 80, height: 100 }} />
                        <Text type='h1White' style={styles.siteName}>Selamat Datang Di Aplikasi Pemuda Tridharma</Text>

                        <View style={styles.btnHolder}>
                            <Button 
                                rounded
                                style={styles.btnLine}
                                onPress={this.onLogin.bind(this)}
                                iconLeft
                            >
                                <Image source={require('./../../img/line-icon.png')} style={{ width: 45, height: 45, marginLeft: 10 }} />
                                <Text style={styles.buttonText}>Log in with LINE</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgMainDark
    },
    holder: {
        padding: 25
    },
    siteName: {
        fontSize: 30,
        marginTop: 50,
        flex: 1
    },
    btnHolder: {
        marginTop: 50
    },
    btnLine: {
        marginTop: 15,
        flex: 1,
        backgroundColor: '#00C300'
    },
    buttonText: {
        flex: 1, 
        textAlign: 'center',
        color: colors.COLOR_LIGHT,
        fontSize: 18
    }
});

export default connect(null, actions)(LoginScreen);
