import React from 'react';

import { Asset } from 'expo-asset';
import { Demo } from './components/Demo';
import Exponent from 'expo';

import AppLoading from 'expo-app-loading';

import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// import REGLParticlesScene from './REGLParticlesScene';

let { height, width } = Dimensions.get('window');
let USE_NATIVE_DRIVER = false;

class App extends React.Component {
  state = {
    isReady: false,
  };

  UNSAFE_componentWillMount() {
    this._cacheResourcesAsync();
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return <Demo />;
  }

  async _cacheResourcesAsync() {
    const assets = [
      require('./assets/trippy-animals.mp4'),
      //require('./assets/trippy-vines.3gp'),
      // require('./assets/logo.json'),
    ];

    for (let asset of assets) {
      await Asset.fromModule(asset).downloadAsync();
    }

    this.setState({ isReady: true });
  }
}


export default App;
