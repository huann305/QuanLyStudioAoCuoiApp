import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TextInputCustom from '../components/TextInputCustom';
import ButtonCustom from '../components/ButtonCustom';
import BASE_URL from '../base/BASE_URL';

const URL_LOGIN = `${BASE_URL}/login`;

const login = (username, password, navigation) => {
  fetch(URL_LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then(res => {
      if (res.status === 200) return res.json();
      else return null;
    })
    .then(data => {
      if (data) {
        navigation.replace('Home', data);
      } else {
        Alert.alert('Error', 'Username or password not match');
      }
    })
    .catch(err => console.log(err));
};

const LoginScreen = ({navigation}) => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
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
        onChangeText={setpassword}
        lable={'Password'}
        placeholder="*********"
      />
      <ButtonCustom
        style={{
          width: '100%',
          marginTop: 10,
        }}
        title={'Login'}
        onPress={() => {
          login(username, password, navigation);
        }}
      />
      <ButtonCustom
        style={{
          width: '100%',
          marginTop: 10,
        }}
        title={'Register'}
        onPress={() => {
          navigation.replace('RegisterScreen');
        }}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
