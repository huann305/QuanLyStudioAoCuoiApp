import { Alert, Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import BASE_URL from '../base/BASE_URL';
import ButtonCustom from '../components/ButtonCustom';
import { useFocusEffect } from '@react-navigation/native';

const url = `${BASE_URL}/tasksnemployee`;

const EmployeeListScreen = ({ navigation, route }) => {
    const idTask = route.params.idTask
    useFocusEffect(
        React.useCallback(() => {
          console.log('Màn hình được tập trung');
          getList()
          
          return () => {
          };
        }, [])
      );
    const [list, setList] = useState([])
    const getList = useCallback(() => {
        fetch(`${url}/${idTask}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(json => setList(json))
            .catch(error => console.error(error))
    }, [])
    useEffect(() => {
        getList()
    }, [])
    return (
        <ScrollView>
            <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center', backgroundColor: '#99D1D3', width: '100%', justifyContent: 'space-between', padding: 10 }}>
                <Image source={require('../img/arrowleft.png')} style={{ width: 30, height: 30, borderRadius: 10 }} />
                <Text style={{ color: '#007F54', fontWeight: 'bold', fontSize: 20 }}>Danh sách nhân viên</Text>
                <Text style={{ width: 30 }}></Text>
            </View>
            <ButtonCustom title='Thêm nhân viên' onPress={() => {
                const newList = []
                for (let i = 0; i < list.length; i++) {
                    newList.push(list[i].idEmployee)
                }
                navigation.navigate('AddEmployee', { idTask: idTask, list: newList })
            }} />
            {list.length > 0 ? list.map((item) => (
                <View key={item._id} style={{ margin: 10, gap: 10, padding: 10, alignItems: 'center', borderRadius: 10, backgroundColor: '#f9c2ff', flexDirection: 'row' }}>
                    <View>
                        <Image style={{ width: 100, height: 100, borderRadius: 10 }} source={{ uri: item.idEmployee.image }} />
                        <ButtonCustom onPress={() => {
                            Alert.alert('Thông báo', 'Bạn có chắc chắn muốn xóa?', [
                                {
                                    text: 'Không',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                                {
                                    text: 'Xóa',
                                    onPress: () => {
                                        fetch(`${url}/` + item._id, {
                                            method: 'DELETE',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                        }).then(response => response.json())
                                            .then(json => console.log(json))
                                            .catch(error => console.error(error))
                                        getList()
                                    },
                                    style: 'destructive',
                                }
                            ])
                        }} title='Xóa' style={{ marginTop: 5 }} />
                    </View>
                    <View>
                        <Text><Text style={{ fontWeight: 'bold' }}>Họ tên: </Text>{item.idEmployee.fullName}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>SĐT: </Text>{item.idEmployee.phoneNumber}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Email: </Text>{item.idEmployee.email}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Bắt đầu: </Text>{item?.dateStart?.slice(0, 10)}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Kết thúc: </Text>{item?.dateEnd?.slice(0, 10)}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Trạng thái: </Text>{item.status}</Text>
                        <Text style={{ maxWidth: 200 }}><Text style={{ fontWeight: 'bold' }}>Ghi chú: </Text>{item.idEmployee.note}</Text>
                    </View>
                </View>
            )) : <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 100 }}>Chưa có nhân viên nào thực hiện công việc này</Text>}
        </ScrollView>
    )
}

export default EmployeeListScreen

const styles = StyleSheet.create({})