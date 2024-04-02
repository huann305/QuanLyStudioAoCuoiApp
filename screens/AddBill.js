import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import BASE_URL from '../base/BASE_URL';
import {Image} from 'react-native-elements';
import DataContext from './Context/DataContext';

const urlService = `${BASE_URL}/services`;
const urlDetailService = `${BASE_URL}/serviceDetails/service`;
const urlCus = `${BASE_URL}/customers`;
const urlBill = `${BASE_URL}/bills`;
const urlDetailBill = `${BASE_URL}/billdetails`;

const AddBill = () => {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [errName, setErrName] = useState(null);
  const [errPhoneNumber, setErrPhoneNumber] = useState(null);
  const [errAddress, setErrAddress] = useState(null);
  const [data_service, setData_service] = useState([]);
  const [index, setIndex] = useState(0);
  const [data_serviceChoosed, setData_serviceChoosed] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const employee = useContext(DataContext);
  //lấy danh sách các dịch vụ
  const getListSer = useCallback(async () => {
    try {
      const res = await fetch(urlService);
      const result = await res.json();
      setData_service(result);
      console.log('Fetching list service is succesfully ');
    } catch (err) {
      console.error('Error fetching data: ' + err);
    }
  });

  useEffect(() => {
    getListSer();
  }, []);

  const TangGiamTotalPrice = useMemo(() => {
    return totalPrice;
  }, [totalPrice]);

  const ThemXoaData_listSerChoosed = useMemo(
    () => data_serviceChoosed,
    [data_serviceChoosed],
  );

  //item dịch vụ được chọn
  const Item = ({item}) => {
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 5,
            paddingHorizontal: 10,
          },
          styles.vien,
        ]}>
        <TouchableOpacity
          style={{flex: 1.2}}
          onPress={() => {
            setData_serviceChoosed(data_serviceChoosed =>
              data_serviceChoosed.filter(itemDel => itemDel._id !== item._id),
            );
            setTotalPrice(totalPrice => totalPrice - item.price);
          }}>
          <Image
            source={require('../img/delete1.png')}
            style={{width: 24, height: 24}}
          />
        </TouchableOpacity>
        <View style={{flex: 3}}>
          <Text>{item.title}</Text>
        </View>
        <View style={{flex: 2.5}}>
          <Text>{item.price}</Text>
        </View>
      </View>
    );
  };

  //item dịch vụ và chi tiết từng dịch vụ
  const ItemSer = ({item}) => {
    const [data_detailService, setData_detailService] = useState([]);
    const getListDetailSer = useCallback(
      async idService => {
        try {
          const res = await fetch(`${urlDetailService}/` + idService);
          const result = await res.json();
          setData_detailService(result);
        } catch (err) {
          console.error('Error fetching data: ' + err);
        }
      },
      [data_service],
    );

    //lấy dịch vụ chi tiết dựa theo id dich vụ
    useEffect(() => {
      getListDetailSer(item._id);
    }, []);
    //item dịch vụ chi tiết
    const ItemDetailSer = ({item}) => {
      return (
        <View
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 5,
              paddingHorizontal: 10,
            },
            styles.vien,
          ]}>
          <TouchableOpacity
            style={{flex: 1.2}}
            onPress={() => {
              setData_serviceChoosed([...data_serviceChoosed, item]);
              setTotalPrice(totalPrice => totalPrice + item.price);
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Thêm</Text>
          </TouchableOpacity>
          <View style={{flex: 3}}>
            <Text>{item.title}</Text>
          </View>
          <View style={{flex: 2.5}}>
            <Text>{item.price}</Text>
          </View>
        </View>
      );
    };

    return (
      <View style={[styles.vien, {marginVertical: 10}]}>
        <View
          style={[
            styles.vien,
            {
              alignItems: 'center',
              paddingVertical: 5,
              backgroundColor: 'rgba( 0, 128, 128, 0.4 )',
            },
          ]}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>
            {item.serviceName}
          </Text>
        </View>
        <FlatList
          data={data_detailService}
          keyExtractor={item => item._id}
          extraData={index}
          renderItem={({item}) => {
            return <ItemDetailSer item={item} />;
          }}
          nestedScrollEnabled={false}
          scrollEnabled={false}
        />
      </View>
    );
  };

  //funtion pay()
  const pay = async () => {
    if (customerName == '') {
      setErrName('Không bỏ trống trường này');
    } else {
      setErrName('');
    }
    if (phoneNumber == '') {
      setErrPhoneNumber('Không bỏ trống trường này');
    } else {
      setErrPhoneNumber('');
    }
    if (address == '') {
      setErrAddress('Không bỏ trống trường này');
    } else {
      setErrAddress('');
    }
    if (errName == '' && errPhoneNumber == '' && errAddress == '') {
      //thực thiện thanh toán
      //1.Tạo nhân viên
      let customer = {
        fullName: customerName,
        phoneNumber: phoneNumber,
        address: address,
      };

      let idCus = null;
      let idBill = null;
      let date = null;
      await fetch(urlCus, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
      })
        .then(res => {
          if (res.status === 200) {
            setAddress('');
            setCustomerName('');
            setPhoneNumber('');
            console.log('Thêm khách hàng thành công');
            return res.json();
          } else {
            throw new Error('Thêm không thành công');
          }
        })
        .then(result => {
          idCus = result._id;
        })
        .catch(error => {
          console.error('Thêm không thành công:', error);
        });

      //tạo hóa đơn
      let bill = {
        idEmployee: employee._id,
        idCustomer: idCus,
        date: new Date(),
        totalPrice: totalPrice,
      };
      await fetch(urlBill, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bill),
      })
        .then(res => {
          if (res.status === 200) {
            console.log('Thêm bill thành công');
            return res.json();
          } else {
            throw new Error('Thêm không thành công');
          }
        })
        .then(result => {
          idBill = result._id;
          date = result.date;
        })
        .catch(error => {
          console.error('Thêm không thành công:', error);
        });

      //tạo hóa đơn chi tiết
      data_serviceChoosed.map(item => {
        const detailBill = {
          idBill: idBill,
          idService: item.idService,
          idDetailService: item._id,
          price: item.price,
          date: date,
        };
        fetch(urlDetailBill, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(detailBill),
        })
          .then(res => {
            if (res.status === 200) {
              console.log('Thêm hóa đơn chi tiết thành công');
              data_serviceChoosed.shift();
              setTotalPrice(0);
            } else {
              throw new Error('Thêm không thành công');
            }
          })
          .catch(error => {
            console.error('Thêm không thành công:', error);
          });
      });
    } else {
      return;
    }
  };

  return (
    <ScrollView style={{marginHorizontal: 20, marginVertical: 10}}>
      <Text style={styles.title}>Nhập thông tin khách hàng</Text>
      <View>
        <View style={styles.txtIp}>
          <TextInput
            placeholder="Tên khách hàng"
            onChangeText={setCustomerName}
            value={customerName}
          />
        </View>
        <Text style={styles.err}>{errName}</Text>
      </View>
      <View>
        <View style={styles.txtIp}>
          <TextInput
            placeholder="Số điện thoại"
            onChangeText={setPhoneNumber}
            value={phoneNumber}
          />
        </View>
        <Text style={styles.err}>{errPhoneNumber}</Text>
      </View>
      <View>
        <View style={styles.txtIp}>
          <TextInput
            placeholder="Địa chỉ"
            onChangeText={setAddress}
            value={address}
          />
        </View>

        <Text style={styles.err}>{errAddress}</Text>
      </View>
      <Text style={styles.title}>Dịch vụ chọn thuê</Text>
      <FlatList
        data={data_serviceChoosed}
        keyExtractor={item => item._id}
        extraData={index}
        renderItem={({item}) => {
          return <Item item={item} />;
        }}
        nestedScrollEnabled={false}
        scrollEnabled={false}
      />
      <View style={styles.cnt3}>
        <TouchableOpacity onPress={pay} style={styles.thanhtoan}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>
            Thanh toán
          </Text>
        </TouchableOpacity>
        <Text style={styles.tongtien}>Tổng tiền: {totalPrice}</Text>
      </View>
      <View style={{marginBottom: 20}}></View>
      <Text style={styles.title}>Danh sách dịch vụ</Text>
      <FlatList
        data={data_service}
        keyExtractor={item => item._id}
        extraData={index}
        renderItem={({item}) => {
          return <ItemSer item={item} />;
        }}
        nestedScrollEnabled={false}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

export default AddBill;

const styles = StyleSheet.create({
  txtIp: {
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#409087',
    paddingHorizontal: 20,
    height: 40,
  },
  vien: {
    borderWidth: 0.3,
    borderColor: 'gray',
  },
  err: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 20,
  },
  thanhtoan: {
    backgroundColor: '#409087',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  cnt3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tongtien: {
    color: '#409087',
    fontSize: 18,
    fontWeight: '500',
    alignSelf: 'flex-end',
    marginVertical: 15,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 20,
  },
});
