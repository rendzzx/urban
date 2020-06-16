/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';
import {
  PermissionsAndroid,
  Text,
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';

import {Container, Icon, Content} from 'native-base';

import {Actions} from 'react-native-router-flux';
import {_storeData, _getData} from '@Component/StoreAsync';
import {urlApi} from '@Config/services';

import Logo from '../components/Logo';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true,
      email: '',
      password: '',
      isHide: false,
      isLogin: false,
      isMount: false,
      userDetails: '',
    };
  }

  async componentWillMount() {
    this.setState({isMount: true});
  }

  async componentDidMount() {
    const isLogin = _getData('@isLogin');
    this.setState(isLogin);
    this.requestPermissions();
  }

  componentWillUnmount() {
    this.setState({isMount: false});
  }

  requestPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        const userResponse = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_CALENDAR,
          PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
        ]);
        return userResponse;
      }
    } catch (err) {
      console.warn(err);
    }
  };

  btnLoginClick = async () => {
    const formData = {
      email: this.state.email,
      password: this.state.password,
    };
    var lengthPass = this.state.password.length;
    if (lengthPass < 1) {
      Alert.alert('Password', 'Please Input Password', [{text: 'ok'}], {
        cancelable: true,
      });
    } else {
      this.setState({isLogin: true}, () => {
        this.doLogin(formData);
      });
    }
  };

  doLogin(value) {
    this.setState({isLoaded: !this.state.isLoaded});
    let data = JSON.stringify(value);
    console.log('data login ', data);
    fetch(urlApi + '/Login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then(response => response.json())
      .then(res => {
        if (!res.Error) {
          console.log('Login Success', res.Data);
          this.signIn(res.Data);
          this.setState({isLoaded: !this.state.isLoaded});
          Actions.Home({email: res.Data.user});
        } else {
          this.setState({isLoaded: !this.state.isLoaded}, () => {
            this.setState({isLogin: !this.state.isLogin});
            Alert.alert(res.Message);
          });
        }
      })
      .catch(error => {
        console.log('error dologin catch ', error);
        this.setState({isLoaded: !this.state.isLoaded}, () => {
          this.setState({isLogin: !this.state.isLogin});
          Alert.alert(error);
        });
      });
  }

  signIn = async res => {
    try {
      _storeData('@UserId', res.user_id);
      _storeData('@User', res.email);
      _storeData('@Name', res.name);
      _storeData('@Group', res.group_cd);

      _storeData('@EmployeeId', res.employee_id);
      _storeData('@Handphone', res.handphone);
      _storeData('@NIK', res.nik);
      _storeData('@NPWP', res.npwp);
      _storeData('@Division', res.division);
      _storeData('@Postition', res.postition);
      _storeData('@RefreshProfile', false);
      _storeData('@isLogin', this.state.isLogin);
    } catch (err) {
      console.log('error:', err);
    } finally {
      this.setState({isLoaded: true}, () => {
        Actions.reset('tabbar');
      });
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Logo />
          <View>
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid="#A9A9A9"
              placeholder="E-Mail"
              placeholderTextColor="#A9A9A9"
              selectionColor="#A9A9A9"
              keyboardType="email-address"
              onSubmitEditing={() => this.password.focus()}
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={val => this.setState({email: val})}
            />
            <Icon name="envelope" type="FontAwesome5" style={styles.mail} />
          </View>
          <View>
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid="#A9A9A9"
              placeholder="Password"
              placeholderTextColor="#A9A9A9"
              ref={input => (this.password = input)}
              onChangeText={val => this.setState({password: val})}
              onSubmitEditing={() => this.btnLoginClick()}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={!this.state.isHide}
              value={this.state.password}
            />
            <Icon
              name={this.state.isHide ? 'eye-slash' : 'eye'}
              type="FontAwesome5"
              style={styles.eye}
              onPress={() =>
                this.setState({
                  isHide: !this.state.isHide,
                })
              }
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.btnLoginClick()}>
            {this.state.isLogin ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
        </Content>
      </Container>
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
  inputBox: {
    width: 300,
    backgroundColor: '#000',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#fff',
    marginVertical: 10,
  },
  button: {
    width: 300,
    backgroundColor: '#3D5BCA',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  eye: {
    position: 'absolute',
    fontSize: 20,
    right: 10,
    top: 20,
    color: '#A9A9A9',
  },
  mail: {
    position: 'absolute',
    fontSize: 20,
    right: 10,
    top: 20,
    color: '#A9A9A9',
  },
});
