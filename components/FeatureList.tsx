import React from 'react';
import { Text } from 'react-native';

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

type FeatureListState = {
  n: number,
}

export default class FeatureList extends React.Component<any, FeatureListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      n: 0,
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({n: this.state.n + 1});
    }, 350);
  }
  render() {
    let features = [
      'EXPO',
      'Native Functionality',
      'Video',
      'Lottie Animations',
      'Native Maps',
      'OpenGL Graphics',
      'Camera Access',
      'Facebook Login',
      'Google Login',
      'Push Notifications',
      'Gyroscope',
      'Bar code scanning',
      'Turning your phone into a space heater',
    ];

    return (
      <Text style={{
        zIndex: 6,
        fontFamily: 'AmericanTypewriter-CondensedBold',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 150,
        left: 10,
        fontSize: 70,
        fontWeight: 'bold',
        color: getRandomColor(),
      }}>{features[this.state.n % features.length]}</Text>
    );
  }
}
