import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {setUser} from '../store/Store';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import Loading from '../components/Loading';
const Login = ({navigation}) => {
  const [phone, setPhone] = useState('0373007856');
  const [password, setPassword] = useState('123');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const postData = {
      phone: phone,
      password: password,
    };
    await axios
      .post('https://kami-backend-5rs0.onrender.com/auth', postData)
      .then(res => {
        setLoading(true);
        const data = res.data;
        dispatch(setUser(data));
        navigation.navigate('BottomNav');
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        value={phone}
        placeholder="Phone"
        style={styles.input}
        onChangeText={setPhone}></TextInput>
      <TextInput
        value={password}
        placeholder="Password"
        style={styles.input}
        onChangeText={setPassword}></TextInput>
      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        <Text style={styles.button_text}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#EF516C',
    marginTop: 100,
    marginBottom: 10,
  },
  input: {
    marginVertical: 10,
    borderRadius: 10,
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 10,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#EF516C',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
  },
  button_text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Login;
