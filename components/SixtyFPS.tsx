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

type SixtyFPSState = {
  color: string;
};

export default class SixtyFPS extends React.Component<any, SixtyFPSState> {
  constructor(props: any) {
    super(props);
    this.state = {
      color: 'white',
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({ color: getRandomColor() });
    }, 15);
  }
  render() {
    return (
      <Text
        style={{
          fontSize: 60,
          fontWeight: 'bold',
          color: this.state.color,
          zIndex: 3,
          right: 15,
          top: 15,
          backgroundColor: 'transparent',
          position: 'absolute',
        }}>
        60fps<Text style={{ fontSize: 14 }}>(mostly)</Text>
      </Text>
    );
  }
}
