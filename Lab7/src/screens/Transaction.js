import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Icon} from 'react-native-paper';
import Loading from '../components/Loading';
import {format} from 'date-fns';

const Transaction = ({navigation}) => {
  const [trans, setTrans] = useState();
  const [services, setServices] = useState([]);

  const handleTransDetails = id => {
    navigation.navigate('TransactionDetail', {data: id});
  };

  const handdleAddTrans = () => {
    navigation.navigate('AddTransaction');
  };

  const fetchTrans = async () => {
    await axios
      .get('https://kami-backend-5rs0.onrender.com/transactions')
      .then(res => {
        setTrans(res.data);
        setServices(res.data.services);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const MyComponent = name => {
    const sers = name;
    return <Text style={styles.text}>- {sers.name}</Text>;
  };

  const BlockTrans = data => {
    return (
      <TouchableOpacity
        onPress={() => handleTransDetails(data.data._id)}
        style={styles.block}>
        <View style={styles.left}>
          <Text style={styles.status}>Status: {data.data.status}</Text>
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
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    fetchTrans();
  }, []);

  if (!trans) {
    return <Loading />;
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Transaction</Text>
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={trans}
          renderItem={({item}) => <BlockTrans data={item} />}
          keyExtractor={item => item._id}
        />
        <TouchableOpacity onPress={() => handdleAddTrans()} style={styles.add}>
          <Icon source="plus-circle" size={50} color="pink" />
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  status: {
    color: 'red',
    fontWeight: 'bold'
  },
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
  left: {
    width: '70%',
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
  text: {
    color: 'black',
  },
});
export default Transaction;
