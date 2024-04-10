import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import DataContext from './Context/DataContext';
import {FlatList} from 'react-native';
import {useCallback} from 'react';
import {useEffect} from 'react';
const EmployeeTask = () => {
  const employee = useContext(DataContext);
  const [listTask, setListTask] = useState([]);
  //get listTask by id Employee
  const getListTaskByidEmp = useCallback(async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/tasksnemployee/employee/${employee._id}`,
      );
      const result = await res.json();
      setListTask(result);
      console.log('List công việc: ' + listTask);
    } catch (err) {
      console.error('Error fetching data: ' + err);
    }
  });

  useEffect(() => {
    getListTaskByidEmp();
    console.log(listTask);
  }, []);

  const ItemTask = ({item}) => {
    //get taskname by id task
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
      fetch(`${BASE_URL}/tasks/${item.idTask._id}`)
        .then(res => res.json())
        .then(res => {
          setTaskName(res.taskName);
          setDescription(res.description);
          console.log(res.taskName);
        })
        .catch(err => console.error(err));
    }, []);

    return (
      <View
        style={{
          margin: 10,
          padding: 10,
          borderRadius: 10,
          backgroundColor: 'white',
          borderWidth: 0.7,
          borderColor: '#409087',
        }}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text style={{fontWeight: 'bold'}}>Tên công việc: </Text>
          <Text>{taskName}</Text>
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text style={{fontWeight: 'bold'}}>Tên công việc: </Text>
          <Text> {description}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>Ngày bắt đầu: </Text>
          <Text>
            {' '}
            {item.dateStart.substring(8, 10)}-{item.dateStart.substring(5, 7)}-
            {item.dateStart.substring(0, 4)}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <FlatList
        data={listTask}
        renderItem={({item}) => <ItemTask item={item} />}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

export default EmployeeTask;

const styles = StyleSheet.create({});
