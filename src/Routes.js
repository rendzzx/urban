/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {_getData} from '@Component/StoreAsync';

//page
import Login from './pages/Login';
import Home from './pages/Home';
import Event from './pages/Event';
import Account from './pages/Account';

const TabIcon = ({focused, iconName}) => {
  var color = focused ? '#1530B5' : '#3D5BCA';
  return (
    <Icon
      name={iconName}
      color={color}
      size={30}
      style={{marginTop: 8}}
      textStyle={color}
    />
  );
};

export default class Routes extends Component {
  constructor() {
    super();
    this.state = {
      hasLogin: false,
      isLoaded: false,
    };
  }

  async componentDidMount() {
    try {
      const isLogin = await _getData('@isLogin');
      console.log('isLogin: ', isLogin);
      if (isLogin) {
        this.setState({hasLogin: true, isLoaded: true});
      } else {
        this.setState({hasLogin: null, isLoaded: true});
      }
    } catch (err) {
      console.log('error: ', err);
    }
  }

  render() {
    return (
      <Router>
        <Scene key="root" headerLayoutPreset="center">
          <Scene
            key="Login"
            initial={!this.state.hasLogin}
            hideNavBar
            component={Login}
          />

          <Scene
            key="tabbar"
            initial={this.state.hasLogin}
            hideNavBar
            showLabel={false}
            translucent={true}
            tabs={true}
            tabBarStyle={styles.tabBar}
            activeTintColor="#1530B5"
            inactiveTintColor="#3D5BCA">
            <Scene
              key="Home"
              component={Home}
              navTransparent={true}
              hideNavBar={true}
              iconName="home"
              icon={TabIcon}
            />

            <Scene
              key="Event"
              component={Event}
              navTransparent={true}
              hideNavBar={true}
              iconName="event"
              icon={TabIcon}
            />

            <Scene
              key="Account"
              component={Account}
              navTransparent={true}
              hideNavBar={true}
              iconName="person"
              icon={TabIcon}
            />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    borderTopColor: '#1530B5',
    borderTopWidth: 3,
    backgroundColor: '#000',
    opacity: 1,
  },
});
