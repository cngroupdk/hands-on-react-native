'use strict';

var React = require('react-native');
var {
  AppRegistry,
  ListView,
  StyleSheet,
  ScrollView,
  StatusBarIOS,
  Text,
  View,
} = React;

var StatusCell = require('./cell');

var DATA = require('./simple.json');

var HandsOnReactNative = React.createClass({
  getInitialState() {
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    return {
        ds: ds,
        data: null,
    }
  },

  _refreshData() {
    fetch('http://46.101.203.134/simple.json').then((response) => {
        return response.json()
    }).then((json) => {
        this.setState({
            data: json,
        })
    })
  },

  componentDidMount() {
    this._refreshData();
  },

  _renderSectionHeader(hashtag) {
    return (
        <View style={[styles.sectionHeader,
        styles.sectionHeaderOther]}>
            <Text style={styles.sectionHeaderText}>#{hashtag}</Text>
        </View>
    );
  },

  _renderCell(status) {
    return <Text>{status.text}</Text>
  },

  render: function() {
    var groups = {}
    if (this.state.data) {
        groups = this.state.data.groups
    } else {
        return <View>
            <Text>Loading...</Text>
            <Text>Loading...</Text>
            <Text>Loading...</Text>
            <Text>Loading...</Text>
        </View>;
    }

    var dataSource = this.state.ds.cloneWithRowsAndSections(groups);

    return (
      <ListView dataSource={dataSource}
        renderSectionHeader={
        (sectionData, hashtag) => {
            return this._renderSectionHeader(hashtag);
        }}
        renderRow={
          (status) => <StatusCell status={status} />
        }/>
    );
  }
});

var styles = StyleSheet.create({
  scrollView: {
  },
  sectionHeader: {
    alignSelf: 'stretch',
    backgroundColor: 'lightgray',
    padding: 5,
  },
  sectionHeaderOther: {
  },
  sectionHeaderText: {
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('HandsOnReactNative', () => HandsOnReactNative);
