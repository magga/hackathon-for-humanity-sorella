import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'firebase';

import store from './src/store';
import MainNavigation from './src/screens/MainNavigation';
import config from './src/secrets/firebase_config';

class App extends Component {
  componentWillMount() {
    firebase.initializeApp(config);  
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <MainNavigation />
        </View>
      </Provider>
    );
  }
}

export default App;
