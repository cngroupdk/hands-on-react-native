import React from 'react-native';
import {
  Image,
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
  userName:{
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  date:{
    flex:1,
    fontSize: 13,
    textAlign: 'right',
  },
  messageText:{
    flex:1,
    fontSize: 15,
    textAlign: 'left',
    alignSelf: 'center',
  },
});
const mockImage = 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/v/t1.0-1/p160x160/11822372_947434988631973_2509887230543043632_n.png?oh=0c264acb85e9a63557510daaf85fc181&oe=56A9EB04&__gda__=1449460365_f9572512af35a2325e75c49c2aa5e349'


export default class MessageCell extends React.Component{
  parseDate(dateString) {
    date = new Date(dateString)
    return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  }
  render() {
    const message = this.props.message;
    return (
      <TouchableHighlight underlayColor='lightgray'>
      <View style={styles.messageBox}>
        <View style={styles.messageBoxTitle}>
          <Text style={styles.userName} numberOfLines={1}>@{message.user.screen_name}</Text>
          <Text style={styles.date} numberOfLines={1}>{this.parseDate(message.created_at)}</Text>
        </View>
        <View style={styles.messageBoxInner}>
          <View style={styles.imageWrapper}>
            <Image style={styles.image} source={{uri: message.user.profile_image_url_https}} />
          </View>
          <Text style={styles.messageText}>{message.text}</Text>
        </View>
      </View>
      </TouchableHighlight>
    )
  }
}
