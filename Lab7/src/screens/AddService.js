import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AddService = ({navigation}) => {
    const user = useSelector(state => state.UserInfo.user);
    const [service, setService] = useState();
    const [price, setPrice] = useState();

    const handleAdd = async () => {
        const postData = {
            name : service,
            price : price
        }
        await axios.post('https://kami-backend-5rs0.onrender.com/services',postData,{
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }).then(res => {
            if(res.status == 200){
              Alert.alert("Add service successfully");
              setService('');
              setPrice('');
            }
            else{
              Alert.alert("Something wrong !");
            }
        })
        .catch(error => {
          console.log(error);
        })
    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service name *</Text>
      <TextInput placeholder="Input a service name" style={styles.input} onChangeText={setService}/>
      <Text style={styles.title}>Price *</Text>
      <TextInput placeholder="Input a service price" style={styles.input} onChangeText={setPrice}/>
      <TouchableOpacity style={styles.button} onPress={() => handleAdd()}>
        <Text style={styles.text}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    borderRadius: 10,
    backgroundColor: '#DBDBDB',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
    borderRadius: 10,
    height: 40
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});
export default AddService;
