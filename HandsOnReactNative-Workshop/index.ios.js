var React = require('react-native');
var {
  AppRegistry,
  ListView,
  StatusBarIOS,
  StyleSheet,
  Text,
  View,
} = React;

var DATA = require('./simple.json');
var StatusCell = require('./cell');

var HandsOnReactNative = React.createClass({
  getInitialState() {
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    return {
      ds: ds,
      data: null,
    };
  },

  componentDidMount() {
    StatusBarIOS.setHidden(true, false);
    this._refreshData();
  },

  _refreshData() {
    fetch('http://cngroupdk.github.io/hands-on-react-native/api/simple.json').then(response => {
      return response.json();
    }).then(json => {
      this.setState({
        data: json,
      });
    });
  },

  _renderSectionHeader(hashtag) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>#{hashtag}</Text>
      </View>
    );
  },

  _renderCell(status) {
    return (
      <Text>{status.text}</Text>
    );
  },

  render() {
    if (!this.state.data) {
      return (
        <View style={styles.loadingWrapper}>
          <Text>Loading...</Text>
        </View>
      );
    }

    var groups = this.state.data.groups;
    var dataSource = this.state.ds.cloneWithRowsAndSections(groups);

    return (
      <ListView
        dataSource={dataSource}
        renderSectionHeader={(sectionData, hashtag) => this._renderSectionHeader(hashtag)}
        renderRow={status => <StatusCell status={status} />} />
    );
  },
});

var styles = StyleSheet.create({
  loadingWrapper: {
    paddingTop: 100,
    alignSelf: 'center',
  },
  sectionHeader: {
    alignSelf: 'stretch',
    backgroundColor: 'lightgray',
    padding: 5,
  },
  sectionHeaderText: {
    fontWeight: 'bold',
  },
});
AppRegistry.registerComponent('HandsOnReactNative', () => HandsOnReactNative);
