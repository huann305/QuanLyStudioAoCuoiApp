import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import TextInputCustom from '../components/TextInputCustom'
import ButtonCustom from '../components/ButtonCustom'

const LoginScreen = ({navigation}) => {
  const [name, setName] = useState("")
  return (
    <View>
      <TextInputCustom onChangeText={setName} lable={"Username"} placeholder="abc@gmail.com"/>
      <ButtonCustom title={"Login"} onPress={() => navigation.navigate('Home')}/>
      <Text>{name}</Text>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})