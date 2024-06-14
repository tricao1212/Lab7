import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Loading from '../components/Loading';
import {Icon} from 'react-native-paper';
import axios from 'axios';
import BlockService from '../components/BlockService';
import img from '../../assets/banner.jpg';
import { useFocusEffect } from '@react-navigation/native';

const Home = ({navigation}) => {
  const user = useSelector(state => state.UserInfo.user);
  const [service, setService] = useState();

  const fectService = async () => {
    await axios
      .get('https://kami-backend-5rs0.onrender.com/services')
      .then(res => {
        const data = res.data;
        setService(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      fectService();
    }, []),
  );

  const handleAddService = () => {
    navigation.navigate('AddService');
  };

  const handleServiceDetail = id => {
    navigation.navigate('ServiceDetail', {data: id});
  };

  if (!user || !service) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{user.name}</Text>
        <Icon source="account-circle" size={30} color="white" />
      </View>
      <View style={styles.logo}>
        <ImageBackground style={styles.bg} source={img} resizeMode="contain" />
      </View>
      <View style={styles.service}>
        <Text style={styles.serviceText}>Danh sách dịch vụ</Text>
        <TouchableOpacity onPress={() => handleAddService()}>
          <Icon source="plus-circle" size={30} color="pink" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={service}
        renderItem={({item}) => (
          <BlockService
            data={item}
            onPress={() => handleServiceDetail(item._id)}
          />
        )}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'pink',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  logo: {
    flex: 1,
    height: 100,
  },
  service: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  serviceText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 17,
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default Home;
