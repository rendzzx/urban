import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Container} from 'native-base';

import GetLocation from 'react-native-get-location';

import {_getData} from '@Component/StoreAsync';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      group: '',
      userId: '',
      token: '',
      hp: '',
    };
  }

  async componentDidMount() {
    const data = {
      email: await _getData('@User'),
      userId: await _getData('@UserId'),
      name: await _getData('@Name'),
      group: await _getData('@Group'),
      token: await _getData('@Token'),
      hp: await _getData('@Handphone'),
    };
    this.setState(data);
  }

  absen = () => {
    Alert.alert(
      'Absen',
      'Are you want to Absen?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            this.absenAction();
          },
        },
      ],
      {cancelable: true},
    );
  };

  absenAction = async () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log('latitude', location.latitude);
        console.log('longitude', location.longitude);
        let googleMapsLink =
          'https://www.google.com/maps/@' +
          location.latitude +
          ',' +
          location.longitude +
          ',21z';
        console.log('link : ', googleMapsLink);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.layout}>
          <View style={styles.row}>
            <View style={styles.col1}>
              <Text style={styles.textWelcome}>Welcome</Text>
              <Text style={styles.textName}>{this.state.name}</Text>
            </View>
          </View>

          <View style={styles.rowBtn}>
            <View style={styles.colBtn}>
              <TouchableOpacity
                style={styles.logoutBtn}
                onPress={() => this.absen()}>
                <Text style={styles.logoutBtnText}>Absen</Text>
              </TouchableOpacity>
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
  textWelcome: {
    fontFamily: 'Cabin-Bold',
    letterSpacing: 3,
    fontSize: 50,
    fontWeight: '700',
    color: '#1530B5',
  },
  textName: {
    letterSpacing: 2,
    textAlign: 'right',
    marginLeft: 4,
    marginTop: -25,
    marginBottom: 20,
    fontSize: 30,
    fontWeight: '300',
    color: '#D3D3D3',
  },
  row: {
    marginLeft: -5,
    marginRight: -5,
    flexDirection: 'row',
  },
  rowBtn: {
    marginLeft: -5,
    marginRight: -5,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 20,
  },
  col1: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  colBtn: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  logoutBtn: {
    width: '100%',
    backgroundColor: '#3D5BCA',
    borderRadius: 30,
    marginVertical: 5,
    paddingVertical: 10,
  },
  logoutBtnText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
});
