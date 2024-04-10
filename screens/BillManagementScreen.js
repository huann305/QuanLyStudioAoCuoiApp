import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import BASE_URL from '../base/BASE_URL';
import { Image } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';

const url = `${BASE_URL}/bills`;
const urlE = `${BASE_URL}/employees`;
const urlC = `${BASE_URL}/customers`;

const BillManagementScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [idDel, setidDel] = useState('');

  //lấy danh sách hóa đơn
  const getLisTBills = useCallback(async () => {
    try {
      const res = await fetch(url);
      const result = await res.json();
      setData(result);
      console.log('Fetching list bills is succesfully ');
    } catch (err) {
      console.error('Error fetching data: ' + err);
    }
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      console.log('Màn hình được tập trung');
      
      getLisTBills()
      
      return () => {
        // Hàm cleanup (nếu cần)
      };
    }, [])
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      console.log('Màn hình mất tập trung');
      
      // Thực hiện các hành động bạn muốn khi màn hình mất tập trung
      // Ví dụ: Làm sạch trạng thái, huỷ bỏ các request không cần thiết, vv.
      
    });


    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    getLisTBills();
  }, []);


  const handleDelete = async id => {
    await fetch(`${url}/` + id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          setIndex(res.json().length);
          getLisTBills();
        }
      })
      .catch(ex => {
        console.log(ex);
      });
  };

  const ItemBill = ({ item }) => {
    const [nameE, setNameE] = useState('');
    const [nameC, setNameC] = useState('');
    // lấy tên nhân viên theo id
    const getEmployee = async () => {
      try {
        const res = await fetch(`${urlE}/` + item.idEmployee);
        const result = await res.json();
        setNameE(result.username);
      } catch (error) {
        console.error('Get employee failed: ' + error);
      }
    };

    //lấy tên khách hàng theo id
    const getCus = async () => {
      try {
        const res = await fetch(`${urlC}/` + item.idCustomer);
        const result = await res.json();
        setNameC(result.fullName);
      } catch (error) {
        console.error('Get customer failed: ' + error);
      }
    };
    useEffect(() => {
      getCus();
      getEmployee();
    }, []);
    //xóa hóa đơn

    return (
      <View style={styles.itemBill}>
        <View style={{ flex: 1 }}>
          <View style={styles.rowContent}>
            <Text style={styles.title}>Mã HĐ: </Text>
            <Text> {item._id}</Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.title}>Tên NV: </Text>
            <Text>{nameE}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <View style={styles.rowContent}>
                <Text style={styles.title}>Tên khách hàng: </Text>
                <Text>{nameC}</Text>
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.title}>Ngày: </Text>
                <Text>
                  {item.date.substring(8, 10)}-{item.date.substring(5, 7)}-
                  {item.date.substring(0, 4)}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setidDel(item._id);
                setVisibleModalDelete(true);
              }}>
              <Image
                source={require('../img/delete.png')}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={[styles.rowContent, ,]}>
              <Text style={[styles.title, { color: '#409087', fontSize: 18 }]}>
                Tổng tiền:{' '}
              </Text>
              <Text style={[styles.title, { color: '#409087', fontSize: 18 }]}>
                {item.totalPrice}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                navigation.navigate('DetailBill', { item });
              }}>
              <Text style={{ color: 'white', fontWeight: '500' }}>Detail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
      data={data}
      keyExtractor={item => item._id}
      renderItem={({ item }) => {
        return <ItemBill item={item} />;
      }}
    // nestedScrollEnabled={false}
    // scrollEnabled={false}
    />

      <Modal
        animationType="fade"
        transparent={true}
        visible={visibleModalDelete}>
        <View style={styles.modal}>
          <View style={styles.dialogDel}>
            <Text
              style={[
                styles.title,
                {
                  color: 'black',
                  fontWeight: '500',
                  fontSize: 20,
                  marginBottom: 30,
                },
              ]}>
              Bạn chắc chắn muốn xóa
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{ marginLeft: 30 }}
                onPress={() => {
                  setVisibleModalDelete(false);
                }}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  handleDelete(idDel);
                  setVisibleModalDelete(false);
                }}>
                <Text
                  style={[
                    styles.title,
                    {
                      color: 'white',
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                    },
                  ]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BillManagementScreen;

const styles = StyleSheet.create({
  itemBill: {
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
  rowContent: { flexDirection: 'row', alignItems: 'center' },
  modal: {
    backgroundColor: 'rgba( 105, 105, 105, 0.5 )',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogDel: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
  },
  btn: {
    backgroundColor: '#409087',
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
});
