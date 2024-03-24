import { StyleSheet, Text, TouchableOpacity, } from 'react-native'
import React from 'react'

const ButtonCustom = ({onPress, title}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button]}>
      <Text style={{textAlign: 'center', color: "#fff", fontWeight: '500' }}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ButtonCustom

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "#409087",
    borderRadius: 10,
  }
})