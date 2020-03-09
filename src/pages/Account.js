import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {Icon} from 'native-base';
import {Actions} from 'react-native-router-flux';

import {
  _storeData,
  _getData,
  _getAllData,
  _removeData,
} from '@Component/StoreAsync';
import {Style, Fonts} from '../Themes';
import {urlApi} from '@Config/services';

export default class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      group: '',
      userId: '',
      token: '',
      gender: '',
      hp: '',

      newPass: '',
      curPass: '',
      conPass: '',

      dataProfile: [],
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
    };

    this.setState(data, () => {
      this.getProfile();
    });
  }

  getProfile = () => {
    fetch(
      urlApi +
        'c_profil/getData/IFCAMOBILE/' +
        this.state.email +
        '/' +
        this.state.userId,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Token: this.state.token,
        },
      },
    )
      .then(response => response.json())
      .then(res => {
        const resData = res.Data[0];
        // ? Agar Gambar Tidak ter cache
        let url = resData.pict + '?random_number=' + new Date().getTime();
        let urlHeader =
          resData.pict_header + '?random_number=' + new Date().getTime();
        this.setState({
          dataProfile: resData,
          fotoProfil: {uri: url},
          fotoHeader: {uri: urlHeader},
          gender: resData.gender,
        });
        console.log('res Profil', res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  logout = () => {
    Alert.alert(
      '',
      'Are you want to Logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.signOut()},
      ],
      {cancelable: false},
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
        Actions.reset('Login');
        // console.log('save profile', res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapperAccount}>
          <Text style={Style.textWhite}>E-mail</Text>
        </View>
        <View style={styles.wrapperLogout}>
          <TouchableOpacity style={styles.sBtn} onPress={() => this.logout()}>
            <Text style={styles.sLink}> Logout</Text>
            <Icon name="log-out" style={{color: '#fff', fontSize: 18}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  wrapperLogout: {
    marginTop: 20,
  },
  wrapperAccount: {
    alignItems: 'flex-start',
    marginVertical: 20,
    color: '#fff',
  },
  sLink: {
    color: '#fff',
    fontSize: 15,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
  },
  sBtn: {
    width: 200,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF6900',
    color: '#FFF',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
