import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import Loading from '../components/Loading';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Button} from 'react-native-paper';
const AddTransaction = () => {
  const [customer, setCustomer] = useState();
  const [customerId, setCustomerId] = useState();
  const [service, setService] = useState();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

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
        const data = res.data;
        setService(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const ServiceBlock = data => {
    const [isChecked, setIsChecked] = useState(false);
    const [quantity, setQuantity] = useState(0);

    const increaseQuantity = () => {
      setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
      if (quantity > 0) {
        setQuantity(quantity - 1);
      }
    };

    return (
      <>
        <BouncyCheckbox
          isChecked={isChecked}
          onPress={() => setIsChecked(!isChecked)}
          text={data.data.name}
          textStyle={
            isChecked ? styles.checkedTextStyle : styles.uncheckedTextStyle
          }
        />
        {isChecked && (
          <View style={styles.additionalComponent}>
            {/* <Text style={styles.label}>Quantity: {quantity}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Increase" onPress={increaseQuantity} />
              <Button title="Decrease" onPress={decreaseQuantity} />
            </View> */}
          </View>
        )}
      </>
    );
  };

  useEffect(() => {
    fectCustomer();
    fectService();
  }, []);

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
      {/* <Text style={styles.selectedValue}>Selected: {value}</Text> */}
      <FlatList
        data={service}
        renderItem={({item}) => <ServiceBlock data={item} />}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  additionalComponent: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
  main: {
    margin: 10,
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
