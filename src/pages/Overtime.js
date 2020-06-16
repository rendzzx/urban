import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Container} from 'native-base';

export default class Event extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.layout}>
          <View style={styles.row}>
            <View style={styles.col1}>
              <Text style={styles.textUrban}>Over</Text>
              <Text style={styles.texrJakarta}>Time</Text>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  layout: {
    backgroundColor: '#000',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
  },
  textUrban: {
    fontFamily: 'Cabin-Bold',
    letterSpacing: 5,
    fontSize: 80,
    fontWeight: '700',
    color: '#1530B5',
  },
  texrJakarta: {
    letterSpacing: 10,
    marginLeft: 4,
    marginTop: -45,
    marginBottom: 20,
    fontSize: 50,
    fontWeight: '300',
    color: '#D3D3D3',
  },
});
