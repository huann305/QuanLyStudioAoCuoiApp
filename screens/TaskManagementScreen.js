import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

const TaskManagementScreen = () => {
  const [data, setData] = useState([]);
  const ItemTask = ({item}) => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text>{item.taskName}</Text>
          <Text>{item.dateStart}</Text>
          <Text>{item.dateEnd}</Text>
          {item.status == 0 ? (
            <Text>Chưa hoàn thành</Text>
          ) : (
            <Text>Đã hoàn thành</Text>
          )}
        </View>
        <View>
          <TouchableOpacity>
            <Text>Sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 7}}>
        <FlatList
          data={data}
          renderItem={ItemTask}
          keyExtractor={item => item._id}
          extraData={index}
        />
      </View>
      <View style={{flex: 0.7}}>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            backgroundColor: '#409087',
            borderRadius: 50,
            justifyContent: 'center',
            alignSelf: 'flex-end',
            marginHorizontal: 20,
          }}>
          <Image
            source={require('../img/plus.png')}
            style={{
              width: 30,
              height: 30,
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskManagementScreen;

const styles = StyleSheet.create({});
