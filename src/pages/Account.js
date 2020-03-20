/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {Container} from 'native-base';
import {Actions} from 'react-native-router-flux';

import {_getData, _removeData} from '@Component/StoreAsync';
import {Style} from '../Themes';
import {urlApi} from '@Config/services';

export default class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      group: '',
      agent_cd: '',
      debtor_acct: '',
      userId: '',
      token: '',
      gender: '',
      hp: '',
      fotoProfil: require('@Asset/images/1.png'),
      fotoHeader: require('@Asset/images/header.png'),
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
      debtor_acct: await _getData('@Debtor'),
      agent_cd: await _getData('@AgentCd'),
    };
    this.setState(data);
  }

  logout = () => {
    Alert.alert(
      '',
      'Are you sure want to logout this account ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Logout Canceled'),
          style: 'cancel',
        },
        {text: 'YES', onPress: () => this.signOut()},
      ],
      {cancelable: true},
    );
  };

  signOut = async () => {
    const formData = {
      email: this.state.email,
      ipAddress: '190',
      device: Platform.OS,
    };
    fetch(urlApi + 'c_auth/Logout/' + this.state.email, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Token: this.state.token,
      },
    })
      .then(response => response.json())
      .then(res => {
        this.removeData();
        console.log('Logged Out');
        Actions.reset('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };

  removeData() {
    _removeData('@UserId');
    _removeData('@Name');
    _removeData('@Token');
    _removeData('@User');
    _removeData('@Group');
    _removeData('@Handphone');
    _removeData('@AgentCd');
    _removeData('@Debtor');
    _removeData('@rowID');
  }

  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.layout}>
          <View style={styles.row}>
            <View style={styles.col1}>
              <Text style={styles.textAccount}>Account</Text>
              <Text style={styles.textInformation}>Information</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.colHead}>User ID</Text>
            <Text style={styles.colBody}>{this.state.userId}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.colHead}>E-mail</Text>
            <Text style={styles.colBody}>{this.state.email}</Text>
          </View>

          <View style={Style.row}>
            <Text style={styles.colHead}>Name</Text>
            <Text style={styles.colBody}>{this.state.name}</Text>
          </View>

          <View style={Style.row}>
            <Text style={styles.colHead}>Handphone</Text>
            <Text style={styles.colBody}>{this.state.hp}</Text>
          </View>
          <View style={{marginVertical: 20}} />
          <View style={Style.row}>
            <Text style={styles.colHead}>Group</Text>
            <Text style={styles.colBody}>{this.state.group}</Text>
          </View>

          <View style={Style.row}>
            <Text style={styles.colHead}>Debtor Account</Text>
            <Text style={styles.colBody}>{this.state.debtor_acct}</Text>
          </View>

          <View style={Style.row}>
            <Text style={styles.colHead}>Agent Code</Text>
            <Text style={styles.colBody}>{this.state.agent_cd}</Text>
          </View>

          <View style={styles.rowBtn}>
            <View style={styles.colBtn}>
              <TouchableOpacity
                style={styles.logoutBtn}
                onPress={() => this.logout()}>
                <Text style={styles.logoutBtnText}>Logout</Text>
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
  textAccount: {
    fontFamily: 'Ubuntu-Bold',
    letterSpacing: 5,
    fontSize: 80,
    fontWeight: '700',
    color: '#1530B5',
  },
  textInformation: {
    letterSpacing: 3,
    marginLeft: 4,
    marginTop: -38,
    marginBottom: 20,
    fontSize: 40,
    fontWeight: '300',
    color: '#D3D3D3',
  },
  col1: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  colHead: {
    color: '#fff',
    flex: 2,
    marginLeft: 10,
  },
  colBody: {
    color: '#fff',
    textAlign: 'right',
    flex: 2,
    marginRight: 10,
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
