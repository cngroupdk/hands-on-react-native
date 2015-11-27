var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  View,
} = React;

var StatusCell = React.createClass({
  render() {
    var status = this.props.status;
    return (
      <View style={styles.wrapper}>
        <Image style={{width: 48, height: 48}} source={{
          uri: status.user.profile_image_url_https}} />
        <Text style={styles.screenName}>@{status.user.screen_name}</Text>
        <Text>{status.text}</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  wrapper: {
    padding: 5,
    borderBottomWidth: 1,
  },
  screenName: {
    fontWeight: 'bold',
  },
});

module.exports = StatusCell;
