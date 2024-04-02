import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import {FlatList} from 'react-native-gesture-handler';
import {Image} from 'react-native-elements';
const url = `${BASE_URL}/listDetailBills`;
const urlService = `${BASE_URL}/services`;
const urlDetailSercive = `${BASE_URL}/serviceDetails`;

const DetailBill = ({navigation, route}) => {
  //   console.log(route);
  const bill = route.params.item;
  console.log(bill);
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  //lấy danh sách hóa đơn chi tiết theo idBill
  const getListDetailBill = async () => {
    const res = await fetch(`${url}/` + route.params.item._id);
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    getListDetailBill();
  }, []);

  const ItemDetailBill = ({item}) => {
    const [serviceName, setServiceName] = useState('');
    const [detailServiceName, setDetailServiceName] = useState('');
    const [uri, setUri] = useState('');
    //lấy tên dịch vụ theo id dịch vụ
    const getService = async () => {
      try {
        const res = await fetch(`${urlService}/` + item.idService);
        const result = await res.json();
        setServiceName(result.serviceName);
        setUri(result.image);
      } catch (error) {
        console.error('Get employee failed: ' + error);
      }
    };

    //lấy tên dịch vụ chi tiết theo id dịch vụ chi tiết
    const getDetailService = async () => {
      try {
        const res = await fetch(`${urlDetailSercive}/` + item.idDetailService);
        const result = await res.json();
        setDetailServiceName(result.title);
      } catch (error) {
        console.error('Get employee failed: ' + error);
      }
    };
    useEffect(() => {
      getDetailService();
      getService();
    });
    return (
      <View style={styles.itemDetailBill}>
        <View style={{flexDirection: 'row'}}>
          {uri !== '' ? (
            <Image
              source={{uri: uri}}
              style={{width: 70, height: 70, borderRadius: 15, marginRight: 20}}
            />
          ) : (
            ''
          )}
          <View>
            <View style={styles.rowContent}>
              <Text style={styles.title}>Tên dịch vụ: </Text>
              <Text> {serviceName}</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.title}>Địa điểm: </Text>
              <Text> {detailServiceName}</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.title}>Note: </Text>
              <Text> {item.note}</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.title}>Giá tiền: </Text>
              <Text> {item.price}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 30,
          marginHorizontal: 20,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../img/arrowleft.png')}
            style={{width: 24, height: 24}}
          />
        </TouchableOpacity>
        <Text style={[styles.title, {fontSize: 20, alignSelf: 'center'}]}>
          Hóa đơn chi tiết
        </Text>
        <View></View>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item._id}
        extraData={index}
        renderItem={({item}) => {
          return <ItemDetailBill item={item} />;
        }}
        // nestedScrollEnabled={false}
        // scrollEnabled={false}
      />
    </View>
  );
};

export default DetailBill;

const styles = StyleSheet.create({
  itemDetailBill: {
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: '500',
    fontSize: 15,
  },
  rowContent: {flexDirection: 'row', alignItems: 'center'},
});
