import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const BlockService = ({navigation, data, onPress}) => {

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.name}>{data.name}</Text>
        <Text>{data.price} đ</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  name: {
    fontWeight: 'bold',
    color: 'black',
  },
});
export default BlockService;
