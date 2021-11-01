import React from 'react';
import { Animated, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

let { height, width } = Dimensions.get('window');
const USE_NATIVE_DRIVER = false;

type JustLottieProps = {};
type JustLottieState = {
  progress: Animated.Value;
  leftPosition: Animated.Value;
  topValue: Animated.Value;
};

export default class JustLottie extends React.Component<
  JustLottieProps,
  JustLottieState
> {
  constructor(props: JustLottieProps) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
      leftPosition: new Animated.Value(0),
      topValue: new Animated.Value(400),
    };
  }

  componentDidMount() {
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

    let doSlide = () => {
      this.state.leftPosition.setValue(0);
      Animated.timing(this.state.leftPosition, {
        useNativeDriver: USE_NATIVE_DRIVER,
        toValue: width - 200,
        duration: 2000,
      }).start(() => {
        Animated.timing(this.state.leftPosition, {
          useNativeDriver: USE_NATIVE_DRIVER,
          toValue: 0,
          duration: 2000,
        }).start(doSlide);
      });
    };
    doSlide();

    let doBounce = () => {
      this.state.topValue.setValue(100); // Start large

      Animated.spring(
        // Base: spring, decay, timing
        this.state.topValue, // Animate `bounceValue`
        {
          useNativeDriver: USE_NATIVE_DRIVER,
          toValue: 400, // Animate to smaller size
          friction: 0.2, // Bouncier spring
        }
      ).start(doBounce); // Start the animation
    };
    doBounce();
  }

  render() {
    return (
      <Animated.View
        style={{
          top: this.state.topValue,
          left: this.state.leftPosition,
          position: 'absolute',
        }}>
        <LottieView
          style={{ width: 200, height: 100 }}
          source={require('../assets/logo.json')}
          progress={this.state.progress}
        />
      </Animated.View>
    );
  }
}
