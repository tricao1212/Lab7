import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Customer from '../screens/Customer';
import Transaction from '../screens/Transaction';
import Setting from '../screens/Setting';
import Home from '../screens/Home';

const BottomNav = () => {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={'gray'}
      inactiveColor={'black'}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: 'home',
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{
          tabBarIcon: 'currency-usd',
        }}
      />
      <Tab.Screen
        name="Customer"
        component={Customer}
        options={{tabBarIcon: 'account-supervisor'}}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{tabBarIcon: 'dots-horizontal-circle'}}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;
