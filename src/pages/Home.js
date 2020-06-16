/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {Container} from 'native-base';
import PTRView from 'react-native-pull-to-refresh';
import GetLocation from 'react-native-get-location';

import {_getData} from '@Component/StoreAsync';
import {urlApi} from '@Config/services';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAttend: false,
    };
  }

  async componentDidMount() {
    const data = {
      userId: await _getData('@UserId'),
      email: await _getData('@User'),
      name: await _getData('@Name'),
      group: await _getData('@Group'),
      token: await _getData('@Token'),

      employeeId: await _getData('@EmployeeId'),
      hp: await _getData('@Handphone'),
      nik: await _getData('@NIK'),
      npwp: await _getData('@NPWP'),
      division: await _getData('@Division'),
      postition: await _getData('@Postition'),
    };
    this.setState(data);
    const dataa = {
      email: this.state.email,
      employee_id: this.state.employeeId,
    };
    // this.cekAttend(dataa);
  }

  attend = () => {
    this.setState({isAttend: true});
    this.attendAction();
  };

  attendAction = async () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        this.setState({isAttend: false});
        const dataa = {
          email: this.state.email,
          employee_id: this.state.employeeId,
          latitude: location.latitude,
          longitude: location.longitude,
        };
        let data = JSON.stringify(dataa);
        console.log('data attend ', data);
        fetch(urlApi + '/Attend', {
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
              if (res.Type === 'IN') {
                Alert.alert('Attend Successful', 'You Have Attend', [], {
                  cancelable: true,
                });
              } else {
                Alert.alert('Out Successful', 'You Have logout', [], {
                  cancelable: true,
                });
              }
              const dataa = {
                email: this.state.email,
                employee_id: this.state.employeeId,
              };
              this.cekAttend(dataa);
              console.log('Attend Success Attend Type : ', res.Type);
            } else {
              Alert.alert('Error', res.Message);
              console.log('Attend Failed, already attend ');
            }
          })
          .catch(error => {
            console.log('error dologin catch ', error);
            Alert.alert(error);
          });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  cekAttend(value) {
    let data = JSON.stringify(value);
    console.log('data refresh', data);
    fetch(urlApi + '/CekAttend', {
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
          console.log(res.Data);
          this.setState({
            attend_id: res.Data.attend_id,
            employee_id: res.Data.employee_id,
            day: res.Data.day,
            name: res.Data.name,
            hour_in: res.Data.hour_in,
            hour_out: res.Data.hour_out,
            latitude_in: res.Data.latitude_in,
            longitude_in: res.Data.longitude_in,
            latitude_out: res.Data.latitude_out,
            longitude_out: res.Data.longitude_out,
          });
        } else {
          Alert.alert('No data available', res.Message, [], {cancelable: true});
          this.setState({
            dataattend: null,
          });
          console.log(res);
        }
      })
      .catch(error => {
        console.log('error cek attend catch ', error);
        Alert.alert(error);
      });
  }

  refresh = () => {
    const data = {
      email: this.state.email,
      employee_id: this.state.employeeId,
    };
    this.cekAttend(data);
  };

  render() {
    return (
      <SafeAreaView>
        <PTRView onRefresh={this.refresh}>
          <Container style={styles.container}>
            <View style={styles.layout}>
              <View style={styles.row}>
                <View style={styles.col1}>
                  <Text style={styles.textWelcome}>Welcome</Text>
                  <Text style={styles.textName}>{this.state.name}</Text>
                </View>
              </View>

              <View style={styles.row}>
                <Text style={styles.colHead}>Employee ID</Text>
                <Text style={styles.colBody}>{this.state.employee_id}</Text>
              </View>

              <View style={{marginVertical: 20}} />

              <View style={styles.row}>
                <View style={styles.col1box}>
                  <View style={styles.row}>
                    <Text style={styles.colHead}>Day</Text>
                    <Text style={styles.colBody}>{this.state.day}</Text>
                  </View>

                  <View style={{marginVertical: 10}} />

                  <View style={styles.row}>
                    <Text style={styles.colHead}>Hour IN</Text>
                    <Text style={styles.colBody}>{this.state.hour_in}</Text>
                  </View>

                  <View style={{marginVertical: 5}} />

                  <View style={styles.row}>
                    <Text style={styles.colHead}>Latitude</Text>
                    <Text style={styles.colBody}>{this.state.latitude_in}</Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.colHead}>Longitude</Text>
                    <Text style={styles.colBody}>
                      {this.state.longitude_in}
                    </Text>
                  </View>

                  <View style={{marginVertical: 10}} />

                  <View style={styles.row}>
                    <Text style={styles.colHead}>Hour OUT</Text>
                    <Text style={styles.colBody}>{this.state.hour_out}</Text>
                  </View>

                  <View style={{marginVertical: 5}} />

                  <View style={styles.row}>
                    <Text style={styles.colHead}>Latitude</Text>
                    <Text style={styles.colBody}>
                      {this.state.latitude_out}
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.colHead}>Longitude</Text>
                    <Text style={styles.colBody}>
                      {this.state.longitude_out}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Container>
        </PTRView>

        <View style={styles.rowBtn}>
          <View style={styles.colBtn}>
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={() => this.attend()}>
              {this.state.isAttend ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text style={styles.logoutBtnText}>Presence</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
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
  col1box: {
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 4,
    minHeight: 100,
    flex: 1,
    padding: 10,
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
