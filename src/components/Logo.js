import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: 100, height: 160}}
          source={require('../images/logo.png')}
        />
        <Text style={styles.logotext}>URBAN JAKARTA</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    marginBottom: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logotext: {
    marginTop: 15,
    fontSize: 18,
    color: '#A9A9A9',
  },
});
