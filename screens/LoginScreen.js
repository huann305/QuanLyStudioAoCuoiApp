import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TextInputCustom from '../components/TextInputCustom';
import ButtonCustom from '../components/ButtonCustom';
import BASE_URL from '../base/BASE_URL';
import TextWith2Line from '../components/TextWith2Line';
import IconWithBorder from '../components/IconWithBorder';

const URL_LOGIN = `${BASE_URL}/login`;

const login = (username, password, navigation) => {
  fetch(URL_LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  }).then(res => {
    if(res.status == 200){
      return res.json()
    }
    return
  })
    .then(data => {
      if (data) {
        navigation.replace('Home', data)
      }
      else {
        Alert.alert('Error', 'Username or password not match');
        throw new Error('Username or password not match');
      }
    })
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
        padding: 20,
        backgroundColor: '#DBFBF6',
      }}>
      <Image
        style={{height: 200, resizeMode: 'contain', marginBottom: 20}}
        source={require('../img/logo_app.png')}
      />
      <Text style={{fontSize: 34, color: '#474747', fontWeight: '500'}}>
        LOGIN
      </Text>
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
      <TextWith2Line>Or</TextWith2Line>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}>
        <IconWithBorder src={require('../img/logo_fb.png')} />
        <IconWithBorder src={require('../img/logo_gg.png')} />
      </View>
      <Text style={{position: 'absolute', bottom: 10}}>
        You don't have an account?{' '}
        <Text
          style={{color: '#000', fontWeight: 'bold'}}
          onPress={() => {
            navigation.replace('RegisterScreen');
          }}>
          Register
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
