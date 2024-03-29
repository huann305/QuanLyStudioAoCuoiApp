import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'

import DataContext from './Context/DataContext';
import TextInputCus from '../components/TextInputCustom';
import ButtonCustom from '../components/ButtonCustom';
import * as ImagePicker from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

const UpdateInforScreen = () => {
  const [hinhAnh, setHinhAnh] = useState(null)
  const data = useContext(DataContext)
  console.log(data)
  const [fullName, setFullName] = useState(data?.fullName ? data.fullName : "")
  const [email, setEmail] = useState(data?.email ? data.email : "")
  const [phoneNumber, setPhoneNumber] = useState(data?.phoneNumber ? data.phoneNumber : "")
  const [address, setAddress] = useState(data?.address ? data.address : "")

  const chonAnh = useCallback(() => {
    let option = {
      mediaType: 'photo',
      selectionLimit: 0,
    }
    ImagePicker.launchImageLibrary(option, setHinhAnh);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
      <View>
        <TouchableOpacity onPress={chonAnh}>
          <Text>Chọn ảnh nè</Text>
        </TouchableOpacity>
        {
          (typeof (hinhAnh?.assets) != 'undefined') ?
            hinhAnh?.assets.map((objImage, index) => {
              return (
                <View key={index} style={{ margin: 10 }}>
                  <Image key={index}
                    source={{ uri: objImage.uri }}
                    style={{
                      height: 150,
                      width: 150,
                      borderRadius: 20
                    }}
                  />
                </View>
              )
            })
            : <Image style={{
              height: 150,
              width: 150,
              borderRadius: 20
            }} source={{uri: data.image}} />
        }

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
            const formData = new FormData()
            
            formData.append('fullName', fullName)
            formData.append('email', email)
            formData.append('phoneNumber', phoneNumber)
            formData.append('address', address)
            formData.append('image', {
              uri: hinhAnh.assets[0].uri,
              type: 'image/jpeg',
              name: 'photo.jpg'
            })
            
            fetch(`http://10.0.2.2:3000/api/employees/${data._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json'
              },
              body: formData
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
                } else {
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