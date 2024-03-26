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
import BASE_URL from '../base/BASE_URL';

//url
const url = `${BASE_URL}/employees`;
const EmployeeManagementScreen = () => {
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
      <View style={styles.itemE}>
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
          <Text>Email: {item.email}</Text>
          <Text>Đchi: {item.adress}</Text>
          <Text>SĐT: {item.phoneNumber}</Text>
          <Text>Chức vụ: {item.role}</Text>
        </View>
        <Image source={require('../img/chevron.png')} />
      </View>
    );
  };
  return (
    <View style={styles.ctn}>
      <View style={styles.v1}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../img/arrowleft.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>Quản lý nhân viên</Text>
        <View></View>
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

      <ScrollView>
        <FlatList
          scrollEnabled={false}
          nestedScrollEnabled={false}
          data={data}
          keyExtractor={item => item._id}
          extraData={index}
          renderItem={({item}) => {
            return <ItemEmployee item={item} />;
          }}
        />
      </ScrollView>
    </View>
  );
};

export default EmployeeManagementScreen;

const styles = StyleSheet.create({
  ctn: {
    marginHorizontal: 10,
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
    marginVertical: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  title: {
    color: 'black',
    fontWeight: '500',
    alignSelf: 'center',
    fontSize: 20,
    flex: 1,
  },
  itemE: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
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
