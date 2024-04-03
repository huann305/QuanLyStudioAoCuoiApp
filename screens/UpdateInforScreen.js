import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'

import DataContext from './Context/DataContext';
import TextInputCus from '../components/TextInputCustom';
import ButtonCustom from '../components/ButtonCustom';

const UpdateInforScreen = () => {
  const data = useContext(DataContext)
  console.log(data)
  // const [fullName, setFullName] = useState(data?.fullName ? data.fullName : "")
  const [email, setEmail] = useState(data?.email ? data.email : "")
  const [phoneNumber, setPhoneNumber] = useState(data?.phoneNumber ? data.phoneNumber : "")
  const [address, setAddress] = useState(data?.address ? data.address : "")
  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
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
          lable={'Full name'} />
        <TextInputCus
          defaultValue={email}
          onChangeText={setEmail}
          lable={'Email'} />
        <TextInputCus
          defaultValue={phoneNumber}
          onChangeText={setPhoneNumber}
          lable={'Phone number'} />
        <TextInputCus
          defaultValue={address}
          onChangeText={setAddress}
          lable={'Address'} />
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
            }).then((res) => {
              if (res.status === 200) return res.json()
              if (res.status === 500) {
                return null
              }
            })
              .then((data) => {
                if (data) {
                  console.log(data)
                  Alert.alert('Cập nhật thành công')
                }else{
                  Alert.alert('Cập nhật thất bại', 'Email đã tồn tại')
                }
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