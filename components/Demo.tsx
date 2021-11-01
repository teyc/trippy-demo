import React from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import MapView, { Region, AnimatedRegion } from 'react-native-maps';
import FeatureList from './FeatureList';
import JustLottie from './JustLottie';
import SixtyFPS from './SixtyFPS';
import { Video } from 'expo-av';
let videoSource = require('../assets/trippy-animals.mp4');

let USE_NATIVE_DRIVER = true;

type DemoState = {
  bounceValue: Animated.Value;
  spinValue: Animated.Value;
  progress: Animated.Value;
  region?: Region;
  regionAnimated: AnimatedRegion;
};

export class Demo extends React.Component<any, DemoState> {
  constructor(props: any) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
      spinValue: new Animated.Value(0),
      progress: new Animated.Value(0),
      regionAnimated: new AnimatedRegion({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922 / 56,
        longitudeDelta: 0.0421 / 26,
      }),
    };
  }

  componentDidMount() {
    let doZoom = () => {
      this.state.regionAnimated
        .timing({
          useNativeDriver: USE_NATIVE_DRIVER,
          latitude: 37.78825 + 0.1,
          longitude: -122.4324 + 1,
          latitudeDelta: 0.0922 * 26,
          longitudeDelta: 0.0421 * 56,
          duration: 3000,
        })
        .start(() => {
          this.state.regionAnimated
            .timing({
              useNativeDriver: USE_NATIVE_DRIVER,
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922 / 56,
              longitudeDelta: 0.0421 / 26,
              duration: 3000,
            })
            .start(doZoom);
        });
    };
    doZoom();

    let doBounce = () => {
      this.state.bounceValue.setValue(3); // Start large

      Animated.spring(
        // Base: spring, decay, timing
        this.state.bounceValue, // Animate `bounceValue`
        {
          useNativeDriver: USE_NATIVE_DRIVER,
          toValue: 1, // Animate to smaller size
          friction: 1, // Bouncier spring
        }
      ).start(doBounce); // Start the animation
    };
    doBounce();

    let doSpin = () => {
      this.state.spinValue.setValue(0);
      Animated.timing(this.state.spinValue, {
        useNativeDriver: USE_NATIVE_DRIVER,
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
      }).start(doSpin);
    };
    doSpin();

    let doLottie = () => {
      this.state.progress.setValue(0);
      Animated.timing(this.state.progress, {
        useNativeDriver: USE_NATIVE_DRIVER,
        toValue: 1,
        duration: 5000,
      }).start(({ finished }) => {
        if (finished) {
          this.forceUpdate();
          doLottie();
        }
      });
    };
    doLottie();
  }

  onRegionChange(region: Region) {
    this.setState({ region });
  }

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const reverseSpin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['720deg', '0deg'],
    });

    //         <REGLParticlesScene style={{flex: 1}} />

    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            zIndex: 2,
            position: 'absolute',
            height: 144,
            width: 256,
            top: 100,
            left: 100,
            transform: [
              // `transform` is an ordered array
              { scale: this.state.bounceValue },
              { rotate: spin }, // Map `bounceValue` to `scale`
            ],
          }}>
          <Video
            style={{
              flex: 1,
            }}
            shouldPlay={true}
            source={videoSource}
            isLooping={true}
          />
        </Animated.View>

        <Animated.View
          style={{
            position: 'absolute',
            top: 400,
            left: 100,
            height: 250,
            width: 400,
            transform: [{ rotate: reverseSpin }],
          }}>
          <MapView
            region={this.state.region}
            onRegionChange={this.onRegionChange}
          />
        </Animated.View>

        <JustLottie />

        <SixtyFPS />

        <FeatureList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
