import {View, Text, TouchableHighlight, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {removeUser} from '../store/Store';

const Setting = ({navigation}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
    navigation.navigate('Login');
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
    borderRadius: 10,
    height: 40,
    margin: 10
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default Setting;
