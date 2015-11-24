import React from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
} from 'react-native';

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flex: 1,
    flexDirection: 'column',
  },
  headerLine: {
    flex: 1,
    flexDirection: 'row',
    padding:1,
  },
  groupSize:{
    flex:1,
    fontSize: 16,
    textAlign: 'right',
  },
  groupText:{
    flex:3,
    fontSize: 16,
    textAlign: 'left',
  },
});

export default class Header extends React.Component{
  _renderHeaderLine(group, count) {
    return(
      <View style={styles.headerLine}>
        <Text style={styles.groupText}>#{group}:</Text><Text style={styles.groupSize}>{count}</Text>
      </View>
    )
  }
  render() {
    const groupKeys = Object.keys(this.props.groups);
    const groups = this.props.groups
    return (
      <View style={styles.header}>
        {groupKeys.forEach(group => this._renderHeaderLine(group, groups[group].length))}
        {groupKeys.map(group => this._renderHeaderLine(group, groups[group].length))}
      </View>
    )
  }
}
