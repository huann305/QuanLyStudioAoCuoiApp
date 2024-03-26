import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const WelcomeScreen = ({navigation}) => {
    setTimeout(() => {
        navigation.replace('Login')
    }, 500);
  return (
    <View>
      <Text>WelcomeScreen</Text>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({})