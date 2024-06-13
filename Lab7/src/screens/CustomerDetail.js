import {View, Text, SafeAreaView, StyleSheet, ScrollView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Loading from '../components/Loading';
import {format} from 'date-fns';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { useFocusEffect } from '@react-navigation/native';

const CustomerDetail = ({navigation, route}) => {
  const id = route.params.data;
  const user = useSelector(state => state.UserInfo.user);
  const [customer, setCustomer] = useState();

  const fecthCustomer = async () => {
    await axios
      .get('https://kami-backend-5rs0.onrender.com/Customers/' + id)
      .then(res => {
        setCustomer(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleDelete = async () => {
    await axios
      .delete('https://kami-backend-5rs0.onrender.com/Customers/' + customer._id, {
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
    navigation.navigate('UpdateCustomer', {data: data});
  };

  const MyComponent = name => {
    const sers = name;
    return <Text style={styles.text}>- {sers.name}</Text>;
  };

  const BlockTrans = data => {
    return (
      <View style={styles.block}>
        <View style={styles.left}>
          <Text style={styles.title}>
            {data.data.id} - {format(data.data.createdAt, 'dd/MM/yy hh:mm')}
          </Text>
          {data.data.services.map((text, index) => (
            <MyComponent key={index} name={text.name} />
          ))}
          <Text>Customer: {data.data.customer.name}</Text>
        </View>
        <View style={styles.logo}>
          <Text style={styles.price}>{data.data.price} đ</Text>
        </View>
      </View>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      fecthCustomer();
    }, []),
  );

  if (!customer) {
    return <Loading />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>General information</Text>
        <View style={styles.general}>
          <View style={styles.left}>
            <Text>Name: </Text>
            <Text>phone: </Text>
            <Text>Total spent:</Text>
            <Text>Time:</Text>
            <Text>Last update:</Text>
          </View>
          <View style={styles.right}>
            <Text>{customer.name}</Text>
            <Text>{customer.phone}</Text>
            <Text style={styles.price}>{customer.totalSpent}</Text>
          </View>
        </View>
      </View>
      <Menu style={styles.container}>
        <MenuTrigger style={styles.action} text="Select action" />
        <MenuOptions>
          <MenuOption onSelect={() => handleUpdate(customer)}>
            <Text style={styles.menuOptionText}>Update</Text>
          </MenuOption>
          <MenuOption onSelect={() => showAlert('Delete')}>
            <Text style={[styles.menuOptionText, {color: 'red'}]}>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
      <View style={styles.container}>
        <Text style={styles.title}>Transaction history</Text>
        {customer.transactions.map((text, index) => (
          <BlockTrans key={index} data={text} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 7,
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
  general: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    color: 'pink',
  },
  block: {
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
    padding: 5,
    width: '100%',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 5,
  },
  left: {
    font: 'bold',
    width: '50%'
  },
  right: {
    fontWeight: 'bold',
    color: 'black',
  },
  serviceList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  total: {
    fontWeight: 'bold',
    color: 'black',
  },
  price: {
    fontWeight: 'bold',
    color: 'pink',
  },
  serName: {
    width: '33%',
  },
});

export default CustomerDetail;
