import { Alert, FlatList, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import BASE_URL from '../base/BASE_URL';
import ButtonCustom from '../components/ButtonCustom';
import TextInputCus from '../components/TextInputCustom';

const url = `${BASE_URL}/tasks`;
const urlTaskEmployee = `${BASE_URL}/tasksnemployee`;

const TaskManagementScreen = ({ navigation }) => {
  const [list, setList] = useState([])
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [taskName, setTaskName] = useState('')
  const [description, setDescription] = useState('')
  const [item, setItem] = useState({})
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
  const Item = useCallback(({ item }) => {
    return (
      <View style={{
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f9c2ff',
      }}>
        <Text><Text style={{ fontWeight: 'bold' }}>Nhiệm vụ: </Text>{item.taskName}</Text>
        <Text><Text style={{ fontWeight: 'bold' }}>Mô tả: </Text>{item.description}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <ButtonCustom style={{ backgroundColor: '#4CAF50' }} title="Danh sách nhân viên" onPress={() => {
            navigation.navigate('EmployeeList', { idTask: item._id })
          }} />
          <ButtonCustom style={{ backgroundColor: '#5BBCFF' }} title="Sửa" onPress={() => {
            setItem(item)
            setVisible2(true)
          }} />
          <ButtonCustom style={{ backgroundColor: '#f44336' }} title="Xóa" onPress={() => {
            Alert.alert('Xóa', 'Xóa công việc', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  fetch(`${url}/${item._id}`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                  }).then(response => response.json())
                    .then(json => getList())
                    .catch(error => console.error(error))
                },
              }
            ])
          }} />
        </View>
      </View>
    )
  })
  return (
    <View>
      <ButtonCustom
        onPress={() => {
          setVisible(true)
        }}
        title='Thêm'
        style={{ position: 'absolute', zIndex: 10, top: -45, right: 10 }} />
      <FlatList
        data={list}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item._id} />
      <Modal visible={visible} animationType="fade" transparent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 10, width: '80%' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Thêm công việc</Text>
            <TextInputCus onChangeText={(text) => setTaskName(text)} placeholder='Nhiệm vụ' />
            <TextInputCus onChangeText={(text) => setDescription(text)} placeholder='Mô tả' />
            <ButtonCustom onPress={() => {
              setVisible(false)
              fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  taskName: taskName,
                  description: description
                })
              }).then(response => response.json())
                .then(json => getList())
                .catch(error => console.error(error))
                .finally(() => { })
            }} style={{ marginVertical: 10 }} title='Tạo' />
            <ButtonCustom title='Hủy' onPress={() => setVisible(false)} />
          </View>
        </View>
      </Modal>
      <Modal visible={visible2} animationType="fade" transparent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 10, width: '80%' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Sửa công việc</Text>
            <TextInputCus defaultValue={item.taskName} lable={'Nhiệm vụ'} onChangeText={(text) => setTaskName(text)} placeholder='Nhiệm vụ' />
            <TextInputCus defaultValue={item.description} lable={'Mô tả'} onChangeText={(text) => setDescription(text)} placeholder='Mô tả' />
            <ButtonCustom onPress={() => {
              setVisible2(false)
              fetch(`${url}/${item._id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  taskName: taskName,
                  description: description
                })
              }).then(response => response.json())
                .then(json => getList())
                .catch(error => console.error(error))
                .finally(() => { })
            }} style={{ marginVertical: 10 }} title='Sửa' />
            <ButtonCustom title='Hủy' onPress={() => setVisible2(false)} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default TaskManagementScreen

const styles = StyleSheet.create({})