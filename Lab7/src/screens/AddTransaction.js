import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import Loading from '../components/Loading';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Button} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
const AddTransaction = () => {
  const user = useSelector(state => state.UserInfo.user);
  const [customer, setCustomer] = useState();
  const [customerId, setCustomerId] = useState();
  const [service, setService] = useState();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const selectedServices = useRef([]);
  console.log('render');
  //   const handleCreateTrans = async () =>{
  //     const postData = {
  //         customerId :
  //     };

  //     await axios.post('https://kami-backend-5rs0.onrender.com/transactions')
  //   }
  const fectCustomer = async () => {
    await axios
      .get('https://kami-backend-5rs0.onrender.com/customers')
      .then(res => {
        setCustomer(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const fectService = async () => {
    await axios
      .get('https://kami-backend-5rs0.onrender.com/services')
      .then(res => {
        setService(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fectCustomer();
    fectService();
  }, []);

  const updateSelectService = useCallback((serviceId, quantity, price, isChecked) => {
    const data = {
      id: serviceId,
      quantity: quantity,
      price: price,
    };
    if (isChecked) {
      const index = selectedServices.current.findIndex(ser => ser.id === serviceId);
      index !== -1 ? {} : selectedServices.current.push(data);
      console.log(selectedServices);
    } else {
      const index = selectedServices.current.findIndex(ser => ser.id === serviceId);
      index !== -1 ? selectedServices.current.splice(index, 1) : {};
    }

    let temp = 0;
    for (let obj of selectedServices.current) {
      if (isNaN(obj.price) == false) {
        temp += obj.price;
      }
    }
    setTotalPrice(temp);
  },[]);

  const ServiceBlock = React.memo(data => {
    const [quan, setQuan] = useState(1);
    const [isChecked, setIsChecked] = useState(false);
    const [price, setPrice] = useState(data.data.price);
    let tempPrice = data.data.price;
    let tempQuan = 1;
    const increase = useCallback(() => {
      setQuan(prevQuan => prevQuan + 1);
      setPrice(prevPrice => (prevPrice += data.data.price));
      tempPrice += data.data.price;
      tempQuan++;
    }, []);

    const decrease = useCallback(() => {
      setQuan(prevQuan => (prevQuan > 1 ? prevQuan - 1 : 1));
      setPrice(prevPrice =>
        prevPrice > price ? (prevPrice -= data.data.price) : data.data.price,
      );
      tempPrice > price ? (tempPrice -= data.data.price) : data.data.price;
      tempQuan > 1 ? tempQuan-- : 1;
    }, []);

    const check = useCallback(() => {
      setIsChecked(prevIsChecked => {
        const newIsChecked = !prevIsChecked;
        updateSelectService(data.data._id, tempQuan, tempPrice, newIsChecked);
        return newIsChecked;
      });
    }, []);

    return (
      <View style={styles.block}>
        <BouncyCheckbox
          isChecked={isChecked}
          onPress={() => check()}
          text={data.data.name}
          textStyle={
            isChecked ? styles.checkedTextStyle : styles.uncheckedTextStyle
          }
        />
        {isChecked && (
          <View>
            <View style={styles.additionalComponent}>
              <View style={styles.left}>
                <TouchableOpacity style={styles.btn} onPress={() => decrease()}>
                  <Text>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quan}</Text>
                <TouchableOpacity style={styles.btn} onPress={() => increase()}>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.right}>
                <Text>Executor: {user.name}</Text>
              </View>
            </View>
            <View style={styles.priceSer}>
              <Text>Price: {price}</Text>
            </View>
          </View>
        )}
      </View>
    );
  });

  if (!customer && !service) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.custext}>Customer*</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={customer}
        search
        maxHeight={300}
        labelField="name"
        valueField="name"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setCustomerId(item._id);
          setValue(item.name);
          setIsFocus(false);
        }}
      />
      <View style={styles.list}>
        <FlatList
          data={service}
          renderItem={({item}) => <ServiceBlock data={item} />}
          keyExtractor={item => item._id}
        />
      </View>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.summary}>
          <Text style={styles.summaryText}>
            See summary: {totalPrice}đ
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  priceSer: {
    marginTop: 20,
    marginLeft: 40,
  },
  summaryText: {
    color: 'white',
    fontWeight: 'bold',
  },
  summary: {
    width: '100%',
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  list: {
    marginTop: 10,
    height: '70%',
  },
  block: {
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  btn: {
    borderWidth: 1,
    width: 30,
    alignItems: 'center',
  },
  left: {
    flex: 1,
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  right: {
    flex: 1,
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    textAlign: 'center',
    borderWidth: 1,
    width: 30,
  },
  additionalComponent: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  main: {
    margin: 10,
    flex: 1,
  },
  custext: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectedValue: {
    marginTop: 20,
    fontSize: 16,
  },
  checkedTextStyle: {
    textDecorationLine: 'none',
    fontSize: 16,
    color: 'black',
  },
  uncheckedTextStyle: {
    textDecorationLine: 'none',
    fontSize: 16,
    color: 'black',
  },
});
export default AddTransaction;
