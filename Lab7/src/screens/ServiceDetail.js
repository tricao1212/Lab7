import {View, Text, SafeAreaView, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useSelector} from 'react-redux';

const ServiceDetail = ({navigation, route}) => {
  const id = route.params.data;
  const [ser, setSer] = useState();
  const user = useSelector(state => state.UserInfo.user);
  const [nameCreator, setNameCreator] = useState();

  const fetchDetailService = async () => {
    await axios
      .get('https://kami-backend-5rs0.onrender.com/services/' + id)
      .then(res => {
        setSer(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDelete = async () => {
    await axios
      .delete('https://kami-backend-5rs0.onrender.com/services/' + ser._id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(res => {
        if (res.status == 200) {
          Alert.alert('Delete successfully');
          navigation.goBack();
        } else {
          Alert.alert('Something wrong !');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const showAlert = (action, id) => {
    Alert.alert(
      `Confirm ${action}`,
      `Are you sure you want to ${action.toLowerCase()}?`,
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => handleDelete(id),
        },
      ],
      {cancelable: false},
    );
  };

  const handleUpdate = data => {
    navigation.navigate('UpdateService', {data: data});
  };

  const fectUsers = async () => {
    await axios
      .get('https://kami-backend-5rs0.onrender.com/users')
      .then(res => {
        for (const i of res.data) {
          if (i._id === ser.createdBy) {
            setNameCreator(i.name);
            break;
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchDetailService();
    fectUsers();
  }, [ser]);

  if (!nameCreator) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.name}>
        Service name: <Text style={styles.description}>{ser.name}</Text>
      </Text>
      <Text style={styles.name}>
        Price: <Text style={styles.description}>{ser.price}</Text>
      </Text>
      <Text style={styles.name}>
        Creator: <Text style={styles.description}>{nameCreator}</Text>
      </Text>
      <Text style={styles.name}>
        Time: <Text style={styles.description}>{ser.createdAt}</Text>
      </Text>
      <Text style={styles.name}>
        Final update: <Text style={styles.description}>{ser.updatedAt}</Text>
      </Text>

      <Menu style={styles.container}>
        <MenuTrigger style={styles.action} text="Select action" />
        <MenuOptions>
          <MenuOption onSelect={() => handleUpdate(ser)}>
            <Text style={styles.menuOptionText}>Update</Text>
          </MenuOption>
          <MenuOption onSelect={() => showAlert('Delete')}>
            <Text style={[styles.menuOptionText, {color: 'red'}]}>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    padding: 13,
    backgroundColor: 'pink',
    borderRadius: 5,
    height: 50,
    marginTop: 10,
  },
  menuOptionText: {
    fontSize: 18,
    padding: 5,
  },
});
export default ServiceDetail;
