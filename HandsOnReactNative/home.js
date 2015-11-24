import React from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    flexDirection: 'column',
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

//import DATA from './2015-11-24-11-50-50-simple.json'
import Header from './header'
import MessageCell from './message-cell'

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
    this.setState({isLoading: true})
    fetch("http://46.101.203.134/simple.json").then((response) => {
      return response.json();
    }).then((json) => {
      this.setState({data: json, isLoading: false});
    })
  }

  _renderRow(message) {
    return (
      <MessageCell message={message} />
    )
  }

  _renderSectionHeader(sectionData, sectionId) {
    return (
      <View style={styles.stickyHeader}>
        <Text style={styles.stickyHeaderText}>#{sectionId}</Text>
      </View>
    )
  }

  _renderHeader(groups) {
    return (
      <Header groups={groups}/>
    )
  }

  _renderReloadButton() {
    return (
      <View style={styles.reloadButton}>
        <TouchableOpacity onPress={()=>{this._refreshData()}}>
        <Text style={styles.reloadButtonText}>Reload</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    if (!this.state.data) {
      return (
        <View style={styles.container}>
          <Text>Loading....</Text>
        </View>
      )
    }
    const data = this.state.data;
    const groups = Object.keys(data)
    const dataSource = this.state.ds.cloneWithRowsAndSections(data.groups);
    return (
      <View style={styles.container}>
        <ListView
          renderHeader={() => this._renderHeader(data.groups)}
          dataSource={dataSource}
          renderRow={this._renderRow.bind(this)}
          renderSectionHeader={this._renderSectionHeader.bind(this)} />
        {this._renderReloadButton()}
      </View>
    )
  }
}
