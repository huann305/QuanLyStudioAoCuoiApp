import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TextInputCustom from '../components/TextInputCustom';
import ButtonCustom from '../components/ButtonCustom';
import BASE_URL from '../base/BASE_URL';

const URL_REGISTER = `${BASE_URL}/employees`;

const RegisterScreen = ({navigation}) => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [repassword, setrepassword] = useState('');
  const [email, setemail] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#DBFBF6',
      }}>
      <TextInputCustom
        style={{
          width: '100%',
        }}
        onChangeText={setusername}
        lable={'Username'}
        placeholder="username"
      />
      <TextInputCustom
        style={{
          width: '100%',
        }}
        onChangeText={setemail}
        lable={'Email'}
        placeholder="bahuan@gmail.com"
      />
      <TextInputCustom
        style={{
          width: '100%',
        }}
        onChangeText={setphoneNumber}
        lable={'Phone Number'}
        placeholder="0987654321"
      />
      <TextInputCustom
        style={{
          width: '100%',
        }}
        onChangeText={setpassword}
        lable={'Password'}
        placeholder="*********"
      />
      <TextInputCustom
        style={{
          width: '100%',
        }}
        onChangeText={setrepassword}
        lable={'Re-password'}
        placeholder="*********"
      />
      <ButtonCustom
        style={{
          width: '100%',
          marginTop: 10,
        }}
        title={'Register'}
        onPress={() => {
          if (password !== repassword) {
            Alert.alert('Error', 'Password not match');
            return;
          }
          fetch(URL_REGISTER, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
              email: email,
              phoneNumber: phoneNumber,
              role: 'employee',
            }),
          })
            .then(res => {
              if (res.status === 200) return res.json();
              else return null;
            })
            .then(json => {
              if (json) {
                navigation.replace('Login', json);
              } else {
                Alert.alert('Error', 'Check your information and try again');
              }
            })
            .catch(err => console.log(err));
        }}
      />
      <ButtonCustom
        style={{
          width: '100%',
          marginTop: 10,
        }}
        title={'Login'}
        onPress={() => {
          navigation.replace('Login');
        }}
      />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
