import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import TextInputCustom from '../components/TextInputCustom'
import ButtonCustom from '../components/ButtonCustom'

const URL_REGISTER = 'http://10.0.2.2:3000/api/employees'

const RegisterScreen = ({ navigation }) => {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [repassword, setrepassword] = useState("")
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#DBFBF6'
        }}>
            <TextInputCustom style={{
                width: '100%'
            }} onChangeText={setusername} lable={"Username"} placeholder="abc@gmail.com" />
            <TextInputCustom style={{
                width: '100%'
            }} onChangeText={setpassword} lable={"Password"} placeholder="*********" />
            <TextInputCustom style={{
                width: '100%'
            }} onChangeText={setrepassword} lable={"Re-password"} placeholder="*********" />
            <ButtonCustom
                style={{
                    width: '100%',
                    marginTop: 10
                }}
                title={"Register"} onPress={() => {
                    if (password !== repassword) {
                        Alert.alert("Error", "Password not match")
                        return
                    }
                    fetch(URL_REGISTER, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            username: username,
                            password: password,
                            fullName: '',
                            email: '',
                            phoneNumber: '',
                            address: ''
                        })
                    })
                        .then(res => {
                            if(res.status === 200) return res.json()
                            else return null
                        })
                        .then(json => {
                            if(json){
                                navigation.replace('Login', json)
                            }else{
                                Alert.alert("Error", "Account already exist")
                            }
                        })
                        .catch(err => console.log(err))
                }} />
            <ButtonCustom
                style={{
                    width: '100%',
                    marginTop: 10
                }}
                title={"Login"} onPress={() => {
                    navigation.replace('Login')
                }} />
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})