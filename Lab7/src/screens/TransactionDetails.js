import {View, Text, SafeAreaView, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {format} from 'date-fns';
import Loading from '../components/Loading';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

const TransactionDetails = ({navigation, route}) => {
  const id = route.params.data;
  const [details, setDetails] = useState();
  const user = useSelector(state => state.UserInfo.user);
  const fetchDetails = async () => {
    await axios
      .get('https://kami-backend-5rs0.onrender.com/transactions/' + id)
      .then(res => {
        setDetails(res.data);
      });
  };

  const handleDelete = async () => {
    {
      details.status === 'cancelled'
        ? Alert.alert('This transaction is already cancel!!!')
        : await axios
            .delete(
              'https://kami-backend-5rs0.onrender.com/transactions/' +
                details._id,
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              },
            )
            .then(res => {
              if (res.status == 200) {
                Alert.alert('Cancel successfully');
                navigation.goBack();
              } else {
                Alert.alert('Something wrong !');
              }
            })
            .catch(error => {
              console.log(error);
            });
    }
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

  const MyComponent = ({data}) => {
    return (
      <View style={styles.serviceList}>
        <View style={styles.serName}>
          <Text>{data.name}</Text>
        </View>
        <View>
          <Text>x{data.quantity}</Text>
        </View>
        <View>
          <Text>{data.price * data.quantity} đ</Text>
        </View>
      </View>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchDetails();
    }, []),
  );

  if (!details) {
    return <Loading />;
  }

  return (
    <SafeAreaView>
      <Menu style={styles.container}>
        <MenuTrigger style={styles.action} text="Cancel" />
        <MenuOptions>
          <MenuOption onSelect={() => showAlert('Cancel')}>
            <Text style={[styles.menuOptionText, {color: 'red'}]}>Cancel</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
      <View style={styles.container}>
        <Text style={styles.title}>General information</Text>
        <View style={styles.general}>
          <View style={styles.left}>
            <Text>Transaction code</Text>
            <Text>Customer</Text>
            <Text>Creation time</Text>
          </View>
          <View style={styles.right}>
            <Text>{details.id}</Text>
            <Text>{details.customer.name}</Text>
            <Text>{format(details.createdAt, 'dd/MM/yy hh:mm')}</Text>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Services list</Text>
        <View>
          {details.services.map((text, index) => (
            <MyComponent key={index} data={text} />
          ))}
          <View style={styles.hr} />
          <View style={styles.general}>
            <View>
              <Text>Total: </Text>
            </View>
            <View>
              <Text>{details.priceBeforePromotion} đ</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Cost</Text>
        <View style={styles.general}>
          <View style={styles.left}>
            <Text>Amount of money</Text>
            <Text>Discount</Text>
          </View>
          <View style={styles.right}>
            <Text>{details.priceBeforePromotion}</Text>
            <Text>-{details.priceBeforePromotion - details.price} đ</Text>
          </View>
        </View>
        <View style={styles.hr} />
        <View style={styles.general}>
          <View style={styles.left}>
            <Text style={styles.total}>Total payment</Text>
          </View>
          <View style={styles.hr} />
          <View style={styles.right}>
            <Text style={styles.price}>{details.price} đ</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 7,
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
  left: {
    font: 'bold',
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

export default TransactionDetails;
