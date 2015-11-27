import dateFormat from 'dateformat';
import React from 'react-native';
import {
  Image,
  PropTypes,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  messageBox: {
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1,
  },
  messageBoxTitle: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: 'lightgray',
  },
  messageBoxInner: {
    flex: 1,
    flexDirection: 'row',
  },
  imageWrapper: {
    alignSelf: 'center',
    padding: 5,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 10,
  },
  userName: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  date: {
    flex: 1,
    fontSize: 13,
    textAlign: 'right',
  },
  messageText: {
    flex: 1,
    fontSize: 15,
    textAlign: 'left',
    alignSelf: 'center',
  },
});

export default class MessageCell extends React.Component {
  _formatDateString(dateString) {
    const date = new Date(dateString);
    return dateFormat(date, 'HH:MM d/m/yyyy');
  }

  render() {
    const message = this.props.message;

    return (
      <TouchableHighlight underlayColor="lightgray">
        <View style={styles.messageBox}>
          <View style={styles.messageBoxTitle}>
            <Text style={styles.userName} numberOfLines={1}>@{message.user.screen_name}</Text>
            <Text style={styles.date} numberOfLines={1}>{this._formatDateString(message.created_at)}</Text>
          </View>
          <View style={styles.messageBoxInner}>
            <View style={styles.imageWrapper}>
              <Image style={styles.image} source={{uri: message.user.profile_image_url_https}} />
            </View>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

MessageCell.propTypes = {
  message: PropTypes.object,
};
