import { Alert, Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import BASE_URL from '../base/BASE_URL';
import ButtonCustom from '../components/ButtonCustom';

const url = `${BASE_URL}/employees`;
const url_employeeTask = `${BASE_URL}/tasksnemployee`;
const EmployeeAddScreen = ({ navigation, route }) => {
    const listEmployeeSelected = route.params.list;
    const idTask = route.params.idTask
    const [list, setList] = useState([])

    const listAdd = []

    const getList = useCallback(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(json => setList(json))
            .catch(error => console.error(error))
            .finally(() => { })
    }, [])

    useEffect(() => {
        getList()
    }, [])

    useEffect(() => {
        for (let i = 0; i < listEmployeeSelected.length; i++) {
            for (let j = 0; j < list.length; j++) {
                if (list[j]._id == listEmployeeSelected[i]._id) {
                    list.splice(j, 1)
                }
            }
        }
    }, [list])

    const Item = ({ item }) => {
        const [backgroundColor, setBackgroundColor] = useState('white')
        return (
            <TouchableOpacity onPress={() => {
                if (checkSelected(item._id)) {
                    listEmployeeSelected.splice(listEmployeeSelected.indexOf(item), 1)
                    listAdd.slice(listAdd.indexOf(item), 1)
                    setBackgroundColor('white')
                } else {
                    setBackgroundColor('#99D1D3')
                    listEmployeeSelected.push(item)
                    listAdd.push(item)
                }
                console.log(listEmployeeSelected.length)
            }}>
                <View style={{ margin: 10, gap: 10, padding: 10, alignItems: 'center', borderRadius: 10, backgroundColor: backgroundColor, flexDirection: 'row' }}>
                    <Image style={{ width: 100, height: 100, borderRadius: 10 }} source={{ uri: item.image }} />
                    <View>
                        <Text><Text style={{ fontWeight: 'bold' }}>Họ tên: </Text>{item.fullName}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>SĐT: </Text>{item.phoneNumber}</Text>
                        <Text><Text style={{ fontWeight: 'bold' }}>Email: </Text>{item.email}</Text>
                        <Text style={{ maxWidth: 200 }}><Text style={{ fontWeight: 'bold' }}>Ghi chú: </Text>{item.note}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const checkSelected = (id) => {
        for (let i = 0; i < listEmployeeSelected.length; i++) {
            console.log(id, listEmployeeSelected[i]._id)
            if (listEmployeeSelected[i]._id == id) {
                return true
            }
        }
        return false
    }

    return (
        <View>
            <ButtonCustom
                onPress={() => {
                    for (let i = 0; i < listAdd.length; i++) {
                        fetch(url_employeeTask, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json'
                            },
                            body: JSON.stringify({
                                idEmployee: listAdd[i]._id,
                                idTask: idTask,
                                dateStart: new Date().getTime()
                            }),
                        }).then(res => {
                            console.log(res)
                        }).catch(err => {
                            console.log(err)
                        }).finally(() => {
                        })
                    }
                    navigation.goBack({load: true})
                    Alert.alert('Thông báo', 'Thêm thành công')
                }}
                title='Thêm'
                style={{ position: 'absolute', zIndex: 10, bottom: 10, right: 10 }} />
            <FlatList
                data={list}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

export default EmployeeAddScreen

const styles = StyleSheet.create({})