import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, StyleSheet, Modal, TextInput, Pressable, Alert } from 'react-native';
import BASE_URL from '../base/BASE_URL';
const URL_services = `${BASE_URL}/services`;
const URL_servicedetails = `${BASE_URL}/serviceDetails`;
import { Checkbox } from 'react-native-paper';

let idItem = '';
let idItemD = '';
let itemDetai = '';

const ServiceManagementScreen = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [detailService, setDetailService] = useState([]);
  const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);
  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [modalVisibleAddD, setModalVisibleAddD] = useState(false);
  const [checked, setChecked] = useState(false);


  const [updateDataService, setUpdateDataService] = useState({
    serviceName: '',
    serviceDescription: ''
  });
  const [updateDataServiceD, setUpdateDataServiceD] = useState({
    title: '',
    price: ''
  });
  const [addDataService, setaddDataService] = useState({
    serviceName: '',
    serviceDescription: '',
  });
  const [addDataServiceD, setaddDataServiceD] = useState({
    title: '',
    price: ''
  });
  const servicesData = useCallback(() => {
    fetch(URL_services)
      .then(response => response.json())
      .then(json => setServices(json))
      .catch(error => {
        console.error(error);
      });
  }, []);

  const detailServiceData = useCallback(() => {
    fetch(URL_servicedetails)
      .then(response => response.json())
      .then(json => setDetailService(json))
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    detailServiceData();
  }, [detailServiceData]);

  useEffect(() => {
    servicesData();
  }, [servicesData]);
  // const handleUpdate = () => {
  //   const objService = {
  //     serviceName: updateData.serviceName,
  //     description: updateData.serviceDescription
  //   };

  //   const objDetail = {
  //     title: updateData.title,
  //     price: updateData.price
  //   };

  //   fetch(URL_services + `/${idItem}`, {
  //     method: 'PUT',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(objService),
  //   })
  //     .then(response => {
  //       if (response.ok) {
  //         return fetch(URL_servicedetails + `/${itemDetai}`, {
  //           method: 'PUT',
  //           headers: {
  //             Accept: 'application/json',
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify(objDetail),
  //         });
  //       } else {
  //         console.log('');
  //       }
  //     })
  //     .then(response => {
  //       if (response.ok) {
  //         servicesData();
  //         detailServiceData();
  //         Alert.alert('Cập nhật thành công');
  //       } else {
  //         console.log('');
  //       }
  //     })
  //     .catch(error => {
  //       Alert.alert('Thất bại đưa dữ liệu vào API: ' + error.message);
  //       console.error(error);
  //     });
  // };

  const ServiceAdd = () => {
    const objService = {
      serviceName: addDataService.serviceName,
      description: addDataService.serviceDescription
    };
    fetch(URL_services, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objService),
    })
      .then(response => {
        if (response.ok) {
          servicesData();
          console.log("data" + response.json())
        } else {
          console.log('');
        }
      })
  };

  // thêm chi tiết
  const serverAddDetail = useCallback(() => {
    console.log(idItemD + 'idItemD');
    const newDetailAdd = {
      idService: idItemD,
      title: addDataServiceD.title,
      price: addDataServiceD.price,
      status: 'Đang hoạt động'
    };
    fetch(URL_servicedetails, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDetailAdd)
    }).then(response => {
      if (response.ok) {
        detailServiceData();
        Alert.alert('Thêm chi tiết thành công');
      } else {
        Alert.alert('Thêm chi tiết thất bại');
      }
    });
  });
  return (
    <SafeAreaView style={{ margin: 30 }}>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => setChecked(!checked)}
      />
      <TouchableOpacity
        onPress={() => {
          setModalVisibleAdd(!modalVisibleAdd);
        }}>
        <Image source={require('../img/sign.png')} />
      </TouchableOpacity>
      <Text>Services</Text>
      <FlatList
        data={services}
        horizontal={false}
        renderItem={({ item }) => (
          <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
            <View style={styles.roww}>
              <Image style={[styles.star, { marginRight: 40 }]} source={require('../img/star.png')} />
              <Text style={[styles.star, styles.em]}>{item.serviceName}</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <View style={{ backgroundColor: 'orange', padding: 8 }}>
                <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: 'black' }}>{item.serviceName}</Text>
              </View>
              {/* Thêm chi tiết */}
              <TouchableOpacity
                onPress={() => {
                  idItemD = item._id;
                  setModalVisibleAddD(!modalVisibleAddD);
                }}
              >
                <Image source={require('../img/update.png')} />
              </TouchableOpacity>
              {detailService && detailService.length > 0 && detailService
                .filter((x) => x.idService && x.idService._id === item._id)
                .map((detailItem) => (
                  <View key={detailItem._id} style={[styles.roww, { borderEndColor: 'gray', borderWidth: 1, borderTopColor: 'white' }]}>
                    <TouchableOpacity>
                    <Text style={[{ flex: 1, fontSize: 15, fontWeight: 'bold', color: 'black' }, styles.star]}>{detailItem.title}</Text>
                      <Text style={[{ flex: 1, fontSize: 15, fontWeight: 'bold', color: 'black' }, styles.star]}>{detailItem.price}</Text>         
                    </TouchableOpacity>
                  </View>
                ))}
 {/* onPress={() => navigation.navigate('DetailServiceScreen', { idItemDetail: detailItem._id, idItemm: item._id })} */}
            </View>
          </View>
        )}
        keyExtractor={item => item._id}
      />
      {/* thêm */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleAdd}>
        <View style={styles.centeredViewU}>
          <View style={styles.modalViewU}>
            <Text style={[styles.modalTextU, styles.modalCenter]}>Thêm</Text>
            <TextInput
              placeholder='Nhập serviceName'
              onChangeText={(text) => setaddDataService(prevData => ({ ...prevData, serviceName: text }))} />
            <TextInput
              placeholder='Nhập serviceDescription'
              onChangeText={(text) => setaddDataService(prevData => ({ ...prevData, serviceDescription: text }))} />
            <Pressable
              style={[styles.buttonU, styles.buttonCloseU]} onPress={() => {
                ServiceAdd();
                setModalVisibleAdd(false);
              }}>
              <Text style={{ textAlign: 'center' }}>Thêm</Text>
            </Pressable>
            <Pressable
              style={[styles.buttonU, styles.buttonCloseU]}
              onPress={() =>
                setModalVisibleAdd(false)
              }>
              <Text style={{ textAlign: 'center' }}>Hủy</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleUpdate}>
        <View style={styles.centeredViewU}>
          <View style={styles.modalViewU}>
            <Text style={[styles.modalTextU, styles.modalCenter]}>Cập nhật</Text>
            <TextInput
              placeholder='Nhập serviceName'
              onChangeText={(text) => setUpdateData(prevData => ({ ...prevData, serviceName: text }))} />
            <TextInput
              placeholder='Nhập serviceDescription'
              onChangeText={(text) => setUpdateData(prevData => ({ ...prevData, serviceDescription: text }))} />
            <TextInput
              placeholder='Nhập title'
              onChangeText={(text) => setUpdateData(prevData => ({ ...prevData, title: text }))} />
            <TextInput
              placeholder='Nhập price'
              onChangeText={(text) => setUpdateData(prevData => ({ ...prevData, price: text }))} />
            <Pressable
              style={[styles.buttonU, styles.buttonCloseU]}
              onPress={() => {
                setModalVisibleUpdate(false);
              }}>
              <Text>Cập nhật</Text>
            </Pressable>
            <Pressable
              style={[styles.buttonU, styles.buttonCloseU]}
              onPress={() => setModalVisibleUpdate(false)}>
              <Text style={{ textAlign: 'center' }}>Hủy</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* thêm chi tiết */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleAddD}>
        <View style={styles.centeredViewU}>
          <View style={styles.modalViewU}>
            <Text style={[styles.modalTextU, styles.modalCenter]}>Thêm chi tiết</Text>
            <TextInput
              placeholder='Nhập title'
              onChangeText={(text) => setaddDataServiceD(prevData => ({ ...prevData, title: text }))} />
            <TextInput
              placeholder='Nhập price'
              onChangeText={(text) => setaddDataServiceD(prevData => ({ ...prevData, price: text }))} />
            <Pressable
              style={[styles.buttonU, styles.buttonCloseU]} onPress={() => {
                serverAddDetail();
                setModalVisibleAddD(false);
              }}>
              <Text style={{ textAlign: 'center' }}>Thêm chi tiết</Text>
            </Pressable>
            <Pressable
              style={[styles.buttonU, styles.buttonCloseU]}
              onPress={() =>
                setModalVisibleAddD(false)
              }>
              <Text style={{ textAlign: 'center' }}>Hủy</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default ServiceManagementScreen;

const styles = StyleSheet.create({
  centeredViewU: {
    flex: 1,
  },
  modalViewU: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 50,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonU: {
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  buttonCloseU: {
    marginRight: 20,
    backgroundColor: '#2196F3',
    marginTop: 10,
  },
  modalTextU: {
    marginBottom: 15,
    color: 'black'
  },
  modalCenter: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  roww: {
    flex: 1,
    flexDirection: 'row'
  },
  star: {
    alignItems: 'center',
    alignSelf: 'center'
  },
  em: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  }
});


