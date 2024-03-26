import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const TextInputCus = (props) => {
  return (
    <View style={[props.layoutStyle, props.style]}>
      <Text style={{ fontSize: 16, color: "#4D4D4D" }}>{props.lable}</Text>
      <TextInput
        {...props}
        placeholderTextColor={props.placeholderTextColor}
        style={[props.style, styles.input]}
      />
    </View>
  )
}

export default TextInputCus

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    padding: 10,
    borderColor: "#239A7D",
    borderWidth: 1,
  }
})

{/* <TextInputCus
        layoutStyle={{margin: 10}}
        style={{ backgroundColor: theme === "light" ? "#93B1A6" : '#D0E7D2' }}
        placeholder={"hehe"}
        placeholderTextColor={theme === "light" ?"#D0E7D2":"#93B1A6" }
        lable="Họ tên" 
        onChangeText={setHoTen}/> */}