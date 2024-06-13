import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AddCustomer = () => {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const user = useSelector(state => state.UserInfo.user);
  const handleAdd = async () => {
    const postData = {
      name: name,
      phone: phone,
    };
    await axios
      .post(' https://kami-backend-5rs0.onrender.com/customers', postData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(res => {
        if (res.status == 200) {
          Alert.alert('Add customer successfully');
          setService('');
          setPrice('');
        } else {
          Alert.alert('Something wrong !');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer name *</Text>
      <TextInput
        placeholder="Input a service name"
        style={styles.input}
        onChangeText={setName}
      />
      <Text style={styles.title}>Phone *</Text>
      <TextInput
        placeholder="Input phone number"
        style={styles.input}
        onChangeText={setPhone}
      />
      <TouchableOpacity style={styles.button} onPress={() => handleAdd()}>
        <Text style={styles.text}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    borderRadius: 10,
    backgroundColor: '#DBDBDB',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
    borderRadius: 10,
    height: 40,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default AddCustomer;
