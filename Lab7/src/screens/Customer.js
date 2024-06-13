import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Icon} from 'react-native-paper';
import Loading from '../components/Loading';
import {useFocusEffect} from '@react-navigation/native';

const Customer = ({navigation}) => {
  const [customers, setCustomers] = useState();

  const fecthCustomer = async () => {
    await axios
      .get('https://kami-backend-5rs0.onrender.com/customers')
      .then(res => {
        setCustomers(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleCusDetails = id => {
    navigation.navigate('CustomerDetail', {data: id});
  };

  const handleAddCustomer = () => {
    navigation.navigate('AddCustomer');
  };

  const BlockCustomer = data => {
    return (
      <TouchableOpacity
        onPress={() => handleCusDetails(data.data._id)}
        style={styles.block}>
        <View>
          <Text style={styles.title}>
            Customer: <Text style={styles.content}>{data.data.name}</Text>
          </Text>
          <Text style={styles.title}>
            Phone: <Text style={styles.content}>{data.data.phone}</Text>
          </Text>
          <Text style={styles.title}>
            Total money:{' '}
            <Text style={styles.price}>{data.data.totalSpent} đ</Text>
          </Text>
        </View>
        <View style={styles.logo}>
          <Icon source={'chess-king'} size={30} color="pink" />
          <Text style={styles.price}>{data.data.loyalty}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      fecthCustomer();
    }, []),
  );

  if (!customers) {
    return <Loading />;
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Customer</Text>
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={customers}
          renderItem={({item}) => <BlockCustomer data={item} />}
          keyExtractor={item => item._id}
        />
        <TouchableOpacity
          style={styles.add}
          onPress={() => handleAddCustomer()}>
          <Icon source="plus-circle" size={50} color="pink" />
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'pink',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 15,
    position: 'relative',
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
  title: {
    fontWeight: 'bold',
  },
  content: {
    fontWeight: 'normal',
    color: 'black',
    marginRight: 15,
  },
  price: {
    color: 'pink',
    fontWeight: 'bold',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 5,
  },
  add: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
export default Customer;
