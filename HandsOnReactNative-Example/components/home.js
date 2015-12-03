import React from 'react-native';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
} from 'react-native';

import DATA from '../simple.json';
import Header from './header';
import MessageCell from './message-cell';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    flex: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  stickyHeader: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'lightgray',
  },
  stickyHeaderText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'bold',
    padding: 3,
    paddingLeft: 5,
  },
  reloadButton: {
    height: 32,
    padding: 10,
  },
  reloadButtonText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      ds,
      data: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    this._refreshData();
  }

  _refreshData() {
    this.setState({
      isLoading: true,
    });

    fetch('http://cngroupdk.github.io/hands-on-react-native/api/simple.json').then(response => {
      return response.json();
    }).then(json => {
      this.setState({
        data: json,
        isLoading: false,
      });
    });
  }

  _renderSectionHeader(sectionData, sectionId) {
    return (
      <View style={styles.stickyHeader}>
        <Text style={styles.stickyHeaderText}>#{sectionId}</Text>
      </View>
    );
  }

  _renderReloadButton() {
    return (
      <View style={styles.reloadButton}>
        <TouchableOpacity onPress={this._refreshData.bind(this)}>
          <Text style={styles.reloadButtonText}>Reload</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _renderLoading() {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text>Loading....</Text>
      </View>
    );
  }

  render() {
    // const [data, isLoading] = [DATA, false];
    const {data, isLoading} = this.state;
    if (!data || isLoading) {
      return this._renderLoading();
    }

    const dataSource = this.state.ds.cloneWithRowsAndSections(data.groups);
    return (
      <View style={styles.container}>
        <ListView
          dataSource={dataSource}
          renderHeader={() => <Header groups={data.groups}/>}
          renderSectionHeader={this._renderSectionHeader.bind(this)}
          renderRow={message => <MessageCell message={message} />} />
        {this._renderReloadButton()}
      </View>
    );
  }
}
