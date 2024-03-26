import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const WelcomeScreen = ({navigation}) => {
    setTimeout(() => {
        navigation.replace('Login')
    }, 500);
  return (
    <View>
      <Image source={require('../img/welcome.png')} style={{height: '100%', width: '100%'}}/>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({})