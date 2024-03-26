import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

//url
const url = 'http://192.168.0.102:3000/api/employees';
const EmployeeManagementScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  //dùng index để sau này thi index thay đổi thì sẽ load lại dữ liệu trên flastlist
  const [index, setindex] = useState(0);
  const [loading, setloading] = useState(true);

  //fetch danh sách nhân viên
  const getListEmployees = async () => {
    try {
      const res = await fetch(url);
      const result = await res.json();
      setData(result);
      setloading(false);
      console.log('Fetching data is succesfully');
    } catch (err) {
      console.error('Error fetching data: ' + err);
    }
  };
  //useEffect
  useEffect(() => {
    getListEmployees();
  }, []);

  //item
  const ItemEmployee = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemE}
        onPress={navigation.navigate('DetailEmployeeScreen')}>
        <Image
          source={{
            uri: item.image,
          }}
          resizeMode="cover"
          style={styles.img}
        />
        <View style={styles.tt}>
          <Text style={{color: 'black', fontWeight: '500', fontSize: 18}}>
            {item.fullName}
          </Text>
          {/* <Text>Email: {item.email}</Text> */}
          <Text>Chức vụ: {item.role}</Text>
        </View>
        <Image source={require('../img/chevron.png')} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.ctn}>
      <View style={styles.v1}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ServiceManagementScreen')}>
          <Image source={require('../img/arrowleft.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>Quản lý nhân viên</Text>
        <Text></Text>
      </View>
      <TouchableOpacity onPress={() => {}}>
        <Image
          source={require('../img/filter.png')}
          style={{alignSelf: 'flex-end', marginVertical: 10}}
        />
      </TouchableOpacity>
      <View style={styles.search}>
        <Image
          source={require('../img/search-interface-symbol.png')}
          style={{width: 24, height: 24}}
        />
        <TextInput placeholder="Search" />
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item._id}
        extraData={index}
        renderItem={({item}) => {
          return <ItemEmployee item={item} />;
        }}
      />
    </View>
  );
};

export default EmployeeManagementScreen;

const styles = StyleSheet.create({
  ctn: {
    marginHorizontal: 15,
  },
  search: {
    backgroundColor: '#EEEDEB',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 40,
    marginBottom: 10,
  },
  v1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    color: 'black',
    fontWeight: '500',
    alignSelf: 'center',
    fontSize: 20,
  },
  itemE: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#EEEDEB',
    marginVertical: 5,
  },
  img: {
    borderRadius: 20,
    width: 90,
    height: 90,
  },
  tt: {
    flex: 4,
    marginHorizontal: 10,
  },
});
