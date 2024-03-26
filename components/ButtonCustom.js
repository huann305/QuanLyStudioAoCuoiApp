import { StyleSheet, Text, TouchableOpacity, } from 'react-native'
import React from 'react'

const ButtonCustom = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, props.style]}>
      <Text style={{textAlign: 'center', color: "#fff", fontWeight: '500' }}>{props.title}</Text>
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