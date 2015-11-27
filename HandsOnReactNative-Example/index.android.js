import React from 'react-native';
import {
  AppRegistry,
} from 'react-native';

import Home from './components/home';

const HandsOnReactNative = React.createClass({
  render() {
    return (
      <Home />
    );
  },
});

AppRegistry.registerComponent('HandsOnReactNative', () => HandsOnReactNative);
