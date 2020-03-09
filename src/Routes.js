import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {_storeData, _getData} from '@Component/StoreAsync';

//page
import Login from './pages/Login';
import Home from './pages/Home';
import Account from './pages/Account';

const TabIcon = ({focused, iconName}) => {
  var color = focused ? '#000' : '#fff';
  return (
    <Icon
      name={iconName}
      color={color}
      size={24}
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
            translucent={true}
            tabs={true}
            tabBarStyle={styles.tabBar}
            activeTintColor="#000"
            inactiveTintColor="#000">
            <Scene
              key="home"
              component={Home}
              navTransparent={true}
              hideNavBar={true}
              title=""
              tabBarLabel="Home"
              color="#000"
              iconName="home"
              icon={TabIcon}
            />

            <Scene
              key="Account"
              component={Account}
              navTransparent={true}
              hideNavBar={true}
              title=""
              tabBarLabel="Account"
              iconName="user"
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
    borderTopColor: '#A9A9A9',
    backgroundColor: '#A9A9A9',
    opacity: 0.98,
  },
  navigationBarStyle: {
    backgroundColor: 'red',
  },
  navigationBarTitleStyle: {
    color: 'white',
  },
});
