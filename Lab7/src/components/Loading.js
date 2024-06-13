import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={styles.conainer}>
      <Text style={styles.title}>Loading</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    conainer : {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title : {
        fontWeight : 'bold',
        fontSize : 60
    }
})

export default Loading