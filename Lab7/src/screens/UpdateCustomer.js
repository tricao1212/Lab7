import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';

const UpdateCustomer = ({navigation, route}) => {
  const user = useSelector(state => state.UserInfo.user);
  const data = route.params.data;
  const [name, setName] = useState(data.name);
  const [phone, setPhone] = useState(data.phone);

  const handleUpdate = async () => {
    const postData = {
      name: name,
      phone: phone,
    };
    await axios
      .put(
        'https://kami-backend-5rs0.onrender.com/Customers/' + data._id,
        postData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      )
      .then(res => {
        if (res.status == 200) {
          Alert.alert('Update successfully');
          navigation.goBack();
        } else {
          Alert.alert('Something wrong !');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.name}>Customer name*:</Text>
      <TextInput value={name} style={styles.input} onChangeText={setName} />
      <Text style={styles.name}>Phone*:</Text>
      <TextInput value={phone} style={styles.input} onChangeText={setPhone} />
      <TouchableOpacity style={styles.button} onPress={() => handleUpdate()}>
        <Text style={styles.text}>Update</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    marginBottom: 4,
  },
  description: {
    fontWeight: 'normal',
  },
  input: {
    borderRadius: 10,
    backgroundColor: '#DBDBDB',
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black',
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
export default UpdateCustomer;
