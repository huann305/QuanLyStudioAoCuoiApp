import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'

import DataContext from './DataContext';
import TextInputCus from '../components/TextInputCustom';
import ButtonCustom from '../components/ButtonCustom';

const UpdateInforScreen = () => {
  const data = useContext(DataContext)
  console.log(data)
  const [fullName, setFullName] = useState(data?.fullName? data.fullName: "")
  const [email, setEmail] = useState(data?.email ? data.email : "")
  const [phoneNumber, setPhoneNumber] = useState(data?.phoneNumber ? data.phoneNumber : "")
  const [address, setAddress] = useState(data?.address ? data.address : "")
  console.log(data)
  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
      <View>
        <Image style={{
          height: 150,
          width: 150,
          borderRadius: 20
        }} source={require('../img/image.png')} />
      </View>
      <View style={{ width: '100%' }}>
        <TextInputCus
          defaultValue={fullName}
          onChangeText={setFullName}
          lable={'Họ tên'} />
        <TextInputCus
          defaultValue={email}
          onChangeText={setEmail}
          lable={'Email'} />
        <TextInputCus
          defaultValue={phoneNumber}
          onChangeText={setPhoneNumber}
          lable={'Số điện thoại'} />
        <TextInputCus
          defaultValue={address}
          onChangeText={setAddress}
          lable={'Địa chỉ'} />
        <ButtonCustom
          onPress={() => {
            fetch(`http://10.0.2.2:3000/api/employees/${data._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                address: address
              })
            }).then((res) => res.json())
              .then((data) => {
                console.log(data)
                Alert.alert('Cập nhật thành công')
              })
              .catch((err) => {
                console.log(err)
              })
          }}
          style={{
            marginTop: 10
          }} title={'Cập nhật'} />
      </View>
    </View>
  )
}

export default UpdateInforScreen

const styles = StyleSheet.create({})