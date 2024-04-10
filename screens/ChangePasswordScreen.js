import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import TextInputCus from '../components/TextInputCustom'
import ButtonCustom from '../components/ButtonCustom'
import DataContext from './Context/DataContext'
import BASE_URL from '../base/BASE_URL'

const URL = `${BASE_URL}/accounts`;

const ChangePasswordScreen = ({navigation}) => {
  const [oldPassword , setoldPassword ] = useState('')
  const [newPassword , setnewPassword ] = useState('')
  const [rePassword , setrePassword ] = useState('')

  const user = useContext(DataContext)

  const handleSubmit = () => {
    if(oldPassword !== user.password){
      Alert.alert('Đổi mật khẩu thất bại', 'Mật khẩu cũ không chính xác')
      return
    }
    if(oldPassword == '' || newPassword == '' || rePassword == ''){
      Alert.alert('Đổi mật khẩu thất bại', 'Vui lòng điền đầy đủ thông tin')
      return
    }
    if(newPassword === rePassword){
      fetch(`${URL}/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          password: newPassword
        })
      }).then(res => {
        return res.json()
      }).then(data => {
        Alert.alert('Đổi mật khẩu thành công', 'Đăng nhập lại để tiếp tục', [{text: 'OK', onPress: () => navigation.replace('WelcomeScreen')}])
      }).catch(err => {
        console.log(err)
      })
    }else{
      Alert.alert('Đổi mật khẩu thất bại', 'Vui lòng kiểm tra lại thông tin')
    }
  }
  return (
    <View style={{flex: 1, padding: 20}}>
      <TextInputCus
        onChangeText={setoldPassword}
        placeholder='Nhập mật khẩu cũ' />
      <TextInputCus
        onChangeText={setnewPassword}
        placeholder='Nhập mật mới' />
      <TextInputCus
        onChangeText={setrePassword}
        placeholder='Nhập lại mật khẩu mới' />
      <ButtonCustom style={{marginTop: 20}} onPress={handleSubmit} title='Đổi mật khẩu'/>
    </View>
  )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({})