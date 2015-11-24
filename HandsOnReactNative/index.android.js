'use strict';
import React from 'react-native';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Home from './home';

var HandsOnReactNative = React.createClass({
  render() {
    return (
      <Home />
    );
  }
});


AppRegistry.registerComponent('HandsOnReactNative', () => HandsOnReactNative);
