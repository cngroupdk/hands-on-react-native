// flex-box playground :)
// put these lines instead of Home in index.ios(.android).js
// export Layout from './components/layout-playground'
// <LayoutPlayground />


// basic layout flex props: {
  // flex: 1,
  // flexDirection: 'row', //column
  // alignItems: 'flex-end', //'flex-start', 'center', 'stretch'
  // alignSelf: 'flex-start', //'auto', 'flex-end', 'center', 'stretch'
  // justifyContent: 'center', //'flex-start', 'flex-end', 'center', 'space-between', 'space-around'
// }


import React from 'react-native';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: 'lightblue',
    // flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  view1: {
    alignSelf: 'flex-start',
    // flex: 1,
    width: 30,
    height: 30,
    backgroundColor: 'red',
  },
  view2: {
    alignSelf: 'center',
    // flex: 2,
    width: 30,
    height: 30,
    backgroundColor: 'green',
  },
  view3: {
    // flex: 1,
    width: 30,
    height: 30,
    backgroundColor: 'blue',
  },
  boxText: {
    textAlign: 'center',
  },
});

export default class LayoutPlayground extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.view1}>
          <Text style={styles.boxText}>1</Text>
        </View>
        <View style={styles.view2}>
          <Text style={styles.boxText}>2</Text>
        </View>
        <View style={styles.view3}>
          <Text style={styles.boxText}>3</Text>
        </View>
      </View>
    );
  }
}
