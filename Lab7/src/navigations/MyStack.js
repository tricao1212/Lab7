import React from 'react';
import Login from '../screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomNav from './BottomNav';
import AddService from '../screens/AddService';
import ServiceDetail from '../screens/ServiceDetail';
import UpdateService from '../screens/UpdateService';
import TransactionDetails from '../screens/TransactionDetails';
import AddCustomer from '../screens/AddCustomer';
import CustomerDetail from '../screens/CustomerDetail';
import UpdateCustomer from '../screens/UpdateCustomer';
import AddTransaction from '../screens/AddTransaction';

const MyStack = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="BottomNav"
          component={BottomNav}
          options={{headerShown: false}}
        />
        <Stack.Screen name="AddService" component={AddService} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
        <Stack.Screen name="UpdateService" component={UpdateService} />
        <Stack.Screen name="TransactionDetail" component={TransactionDetails} />
        <Stack.Screen name="AddCustomer" component={AddCustomer} />
        <Stack.Screen name="CustomerDetail" component={CustomerDetail} />
        <Stack.Screen name="UpdateCustomer" component={UpdateCustomer} />
        <Stack.Screen name="AddTransaction" component={AddTransaction} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
