/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Container} from 'native-base';
import {Actions} from 'react-native-router-flux';

import {_getData, _storeData, _removeData} from '@Component/StoreAsync';
import {Style} from '../Themes';
import {urlApi} from '@Config/services';

export default class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOut: false,
    };
  }

  async componentDidMount() {
    const data = {
      userId: await _getData('@UserId'),
      email: await _getData('@User'),
      name: await _getData('@Name'),
      group: await _getData('@Group'),
      token: await _getData('@Token'),
      debtor_acct: await _getData('@Debtor'),
      agent_cd: await _getData('@AgentCd'),

      employeeId: await _getData('@EmployeeId'),
      hp: await _getData('@Handphone'),
      nik: await _getData('@NIK'),
      npwp: await _getData('@NPWP'),
      division: await _getData('@Division'),
      postition: await _getData('@Postition'),
    };
    this.setState(data);
  }

  logout = () => {
    this.setState({isOut: true});
    Alert.alert(
      '',
      'Are you sure want to logout this account ?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            this.setState({isOut: false});
            console.log('Logout Canceled');
          },
          style: 'cancel',
        },
        {text: 'YES', onPress: () => this.signOut()},
      ],
      {cancelable: true},
    );
  };

  signOut = async () => {
    this.setState({isOut: false});
    this.removeData();
    console.log('Logged Out');
    _storeData('@isLogin', false);
    Actions.reset('Login');
  };

  removeData() {
    _removeData('@UserId');
    _removeData('@User');
    _removeData('@Name');
    _removeData('@Group');
    _removeData('@AgentCd');
    _removeData('@Debtor');

    _removeData('@EmployeeId');
    _removeData('@Handphone');
    _removeData('@NIK');
    _removeData('@NPWP');
    _removeData('@Division');
    _removeData('@Postition');
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

          <View style={{marginVertical: 20}} />

          <View style={Style.row}>
            <Text style={styles.colHead}>Employee ID</Text>
            <Text style={styles.colBody}>{this.state.employeeId}</Text>
          </View>

          <View style={Style.row}>
            <Text style={styles.colHead}>NIK</Text>
            <Text style={styles.colBody}>{this.state.nik}</Text>
          </View>

          <View style={Style.row}>
            <Text style={styles.colHead}>NPWP</Text>
            <Text style={styles.colBody}>{this.state.npwp}</Text>
          </View>

          <View style={{marginVertical: 20}} />

          <View style={Style.row}>
            <Text style={styles.colHead}>Division</Text>
            <Text style={styles.colBody}>{this.state.division}</Text>
          </View>

          <View style={Style.row}>
            <Text style={styles.colHead}>Postition</Text>
            <Text style={styles.colBody}>{this.state.postition}</Text>
          </View>

          <View style={styles.rowBtn}>
            <View style={styles.colBtn}>
              <TouchableOpacity
                style={styles.logoutBtn}
                onPress={() => this.logout()}>
                {this.state.isOut ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <Text style={styles.logoutBtnText}>Logout</Text>
                )}
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
