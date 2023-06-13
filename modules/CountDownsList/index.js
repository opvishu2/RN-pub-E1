import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, FlatList,Dimensions } from 'react-native'
import React from 'react'
import CountDown from './Countdown'
const {height,width}=Dimensions.get('window')

const CountDownsList = () => {
  const arr=Array.apply(null, Array(9)).map(function () {})

  return (
        <SafeAreaView style={styles.container}>
            <FlatList
            data={arr}
            contentContainerStyle={{ paddingBottom: height*0.25,paddingTop:10,backgroundColor:"black" }}
            keyExtractor={(item,index) => index}
            renderItem={({item,index})=><CountDown />}
            />
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {flex:1,background:"black" }
});


export default CountDownsList