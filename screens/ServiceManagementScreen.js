 
import React, {useState, useMemo, useEffect, useCallback} from 'react';
 
 
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import BASE_URL from '../base/BASE_URL';
const URL_services = `${BASE_URL}/services`;
const URL_servicedetails = `${BASE_URL}/serviceDetails`;
import TextInputCus from '../components/TextInputCustom';
import ButtonCustom from '../components/ButtonCustom';
import * as ImagePicker from 'react-native-image-picker';

let idItem = '';
let idItemD = '';

const ServiceManagementScreen = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [detailService, setDetailService] = useState([]);
  const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);
  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [modalUpdateService, setmodalUpdateService] = useState(false);
  const [modalVisibleAddD, setModalVisibleAddD] = useState(false);
  const [hinhAnh, sethinhAnh] = useState(null);

  const chonAnh = useCallback(() => {
    let option = {
      mediaType: 'photo',
      selectionLimit: 0,
    };
    ImagePicker.launchImageLibrary(option, sethinhAnh);
  }, []);

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
    price: '',
  });
  const servicesData = useCallback(() => {
    fetch(URL_services)
      .then(response => response.json())
      .then(json => setServices(json))
      .catch(error => {
      });
  }, []);

  const radioButtons = useMemo(() => ([
    {
        id: '1', 
        label: 'Đang hoạt động',
        value: 'Đang hoạt động'
    },
    {
        id: '2',
        label: 'Tạm dừng',
        value: 'Tạm dừng'
    }
]), []);
const [selectedId, setSelectedId] = useState();

  const detailServiceData = useCallback(() => {
    fetch(URL_servicedetails)
      .then(response => response.json())
      .then(json => setDetailService(json))
      .catch(error => {
      });
  }, []);

  useEffect(() => {
    detailServiceData();
  }, [detailServiceData]);

  useEffect(() => {
    servicesData();
  }, [servicesData]);
  const handleUpdate = () => {
    setModalVisibleUpdate(!modalVisibleUpdate);
    //call update service detail
    const objDetail = {
      title: updateDataServiceD.title,
      price: updateDataServiceD.price,
      status: selectedId == '1'? '1': '2',
    };
    fetch(URL_servicedetails + `/${idItem}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objDetail),
    }).then(response => {
      if (response.ok) {
        detailServiceData();
      } else {
      }
    }).then(() => {
      setUpdateDataServiceD({
        title: '',
        price: '',
        status: ''
      })
      detailServiceData()
    }).catch(error => {
    })
      .then(response => {
        if (response.ok) {
          detailServiceData();
          console.log('data' + response.json());
        } else {
          console.log('');
        }
      })
      .then(() => {
        setUpdateDataServiceD({
          title: '',
          price: ''
        });
        detailServiceData();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const ServiceAdd = () => {
    const objService = {
      serviceName: addDataService.serviceName,
      description: addDataService.serviceDescription,
    };

    const formData = new FormData();
    formData.append('image', {
      uri: hinhAnh.assets[0].uri,
      type: hinhAnh.assets[0].type,
      name: hinhAnh.assets[0].fileName,
    });
    formData.append('serviceName', objService.serviceName);
    formData.append('description', objService.description);
    fetch(URL_services, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    }).then(response => {
      if (response.ok) {
        servicesData();
        console.log('data' + response.json());
      } else {
        console.log('');
      }
    });
  };

  const handleUpdateService = () => {
    setmodalUpdateService(!modalUpdateService);
    //call update service
    const url = URL_services + `/${idItemD}`;
    const formData = new FormData();
    if (hinhAnh !== null) {
      formData.append('image', {
        uri: hinhAnh.assets[0].uri,
        type: hinhAnh.assets[0].type,
        name: hinhAnh.assets[0].fileName,
      });
    }
    formData.append('serviceName', addDataService.serviceName);
    formData.append('description', addDataService.serviceDescription);
    fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    }).then(response => {
      if (response.ok) {
        servicesData();
      } else {
      }
    }).catch(error => {
    }).finally(() => {
      resetData()
    })
      .then(response => {
        if (response.ok) {
          servicesData();
          console.log('data' + response.json());
        } else {
          console.log('');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  // thêm chi tiết
  const serverAddDetail = useCallback(() => {
    const newDetailAdd = {
      idService: idItemD,
      title: addDataServiceD.title,
      price: addDataServiceD.price,
      status: 'Đang hoạt động',
    };
    fetch(URL_servicedetails, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDetailAdd),
    }).then(response => {
      if (response.ok) {
        detailServiceData();
        Alert.alert('Thêm chi tiết thành công');
      } else {
        Alert.alert('Thêm chi tiết thất bại');
      }
    });
  });

  const ItemService = ({ item }) => {
    const [isShowMore, setisShowMore] = useState(false);
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column', marginHorizontal: 10
        }}>
        <View style={{ marginTop: 10 }}>
          <View style={{ backgroundColor: 'orange', padding: 8 }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                fontWeight: 'bold',
                color: '#fff',
              }}>
              {item.serviceName}
            </Text>
          </View>
          <View>
            <Image
              source={{ uri: item.image }}
              style={{ width: '100%', height: 200 }}
            />
          </View>
          <View>
            <Text style={{ borderBottomWidth: 1 }}>{item.description}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setisShowMore(!isShowMore);
            }}
            style={{
              position: 'absolute',
              right: 10,
              top: 8,
              alignItems: 'flex-end',
              zIndex: 10,
            }}>
            <Image
              style={{ width: 20, height: 20, marginBottom: 3 }}
              source={require('../img/more.png')}
            />
            {isShowMore ? (
              <View
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#F8F8FF',
                  elevation: 5,
                }}>
                <TouchableOpacity
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                    borderBottomWidth: 1,
                    borderColor: '#F8F8FF',
                  }}
                  onPress={() => {
                    idItemD = item._id;
                    setModalVisibleAddD(!modalVisibleAddD);
                    setisShowMore(!isShowMore);
                  }}>
                  <Text>Thêm chi tiết</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setisShowMore(!isShowMore);
                    setmodalUpdateService(true);
                    setaddDataService({
                      serviceName: item.serviceName,
                      serviceDescription: item.description,
                    });
                    idItemD = item._id;
                  }}
                  style={{ paddingVertical: 5, paddingHorizontal: 15 }}>
                  <Text>Cập nhật</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <></>
            )}
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', borderBottomWidth: 1, zIndex: 0 }}>
            <Text
              style={[
                { flex: 2, fontSize: 15, fontWeight: 'bold', color: 'black' },
                styles.star,
              ]}>
              Địa điểm
            </Text>
            <Text
              style={[
                { flex: 2, fontSize: 15, fontWeight: 'bold', color: 'black' },
                styles.star,
              ]}>
              Giá
            </Text>
            <Text
              style={[
                { flex: 2, fontSize: 15, fontWeight: 'bold', color: 'black' },
                styles.star,
              ]}>
              Trạng thái
            </Text>
            <Text
              style={[
                { flex: 1, fontSize: 15, fontWeight: 'bold', color: 'black' },
                styles.star,
              ]}>

            </Text>
          </View>
          {detailService &&
            detailService.length > 0 &&
            detailService
              .filter(x => x.idService && x.idService._id === item._id)
              .map(detailItem => (
                <View
                  key={detailItem._id}
                  style={[
                    {
                      borderEndColor: 'gray',
                      borderBottomWidth: 1,
                      borderTopColor: 'white',
                      padding: 5,
                    },
                  ]}>
                  <TouchableOpacity
                    style={{ flexDirection: 'row' }}>
                    <Text
                      style={[
                        {
                          flex: 2,
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: 'black',
                        },
                        styles.star,
                      ]}>
                      {detailItem.title}
                    </Text>
                    <Text
                      style={[
                        {
                          flex: 2,
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: 'black',
                        },
                        styles.star,
                      ]}>
                      {detailItem.price} VNĐ
                    </Text>
                    <Text
                      style={[
                        {
                          flex: 2,
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: 'black',
                        },
                        styles.star,
                      ]}>
                      {detailItem.status}
                    </Text>
                    <ButtonCustom
                      onPress={() => {
                        setModalVisibleUpdate(true);
                        idItem = detailItem._id;
                        setUpdateDataServiceD(detailItem);
                      }}
                      title="Cập nhật"
                      style={[
                        {
                          flex: 1,
                          fontSize: 15,
                          fontWeight: 'bold',
                          color: 'black',
                        },
                        styles.star,
                      ]} />
                  </TouchableOpacity>
                </View>
              ))}
        </View>
      </View>
    );
  };

  const resetData = () => {
    sethinhAnh(null);
    setmodalUpdateService(false);
    setUpdateDataServiceD({
      title: '',
      price: ''
    });
    setaddDataService({
      serviceName: '',
      serviceDescription: '',
    });
    setModalVisibleAdd(false);
    setModalVisibleUpdate(false);
    setModalVisibleAddD(false);
    setaddDataServiceD({
      title: '',
      price: ''
    });
  };

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={{ position: 'absolute', zIndex: 1, bottom: 10, right: 10 }}
        onPress={() => {
          setModalVisibleAdd(!modalVisibleAdd);
        }}>
        <Image source={require('../img/sign.png')} />
      </TouchableOpacity>
      {/* <Text>Services</Text> */}
      <FlatList
        data={services}
        horizontal={false}
        renderItem={({ item }) => <ItemService item={item} />}
        keyExtractor={item => item._id}
      />
      {/* thêm */}
      <Modal animationType="fade" transparent={true} visible={modalVisibleAdd}>
        <View style={styles.centeredViewU}>
          <View style={styles.modalViewU}>
            <Text style={[styles.modalTextU, styles.modalCenter]}>Thêm</Text>
            {hinhAnh ? (
              <View
                onPress={chonAnh}
                style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View
                  style={{
                    borderRadius: 10,
                    width: 100,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{ uri: hinhAnh.assets[0].uri }}
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                  />
                  <TouchableOpacity
                    onPress={chonAnh}
                    style={{ position: 'absolute', bottom: -10, right: -10 }}>
                    <View
                      style={{
                        backgroundColor: '#ccc',
                        padding: 10,
                        borderRadius: 10,
                      }}>
                      <Image
                        source={require('../img/camera.png')}
                        style={{ width: 20, height: 20 }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                onPress={chonAnh}
                style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View
                  style={{
                    backgroundColor: '#ccc',
                    padding: 10,
                    borderRadius: 10,
                    width: 120,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../img/camera.png')}
                    style={{ width: 100, height: 100 }}
                  />
                </View>
              </TouchableOpacity>
            )}
            <TextInputCus
              placeholder="Nhập serviceName"
              onChangeText={text =>
                setaddDataService(prevData => ({
                  ...prevData,
                  serviceName: text,
                }))
              }
            />
            <TextInputCus
              placeholder="Nhập serviceDescription"
              onChangeText={text =>
                setaddDataService(prevData => ({
                  ...prevData,
                  serviceDescription: text,
                }))
              }
            />
            <ButtonCustom
              style={{ marginTop: 10 }}
              onPress={() => {
                ServiceAdd();
                resetData();
              }}
              title={'Thêm'}
            />
            <ButtonCustom
              style={{ marginTop: 10 }}
              onPress={() => {
                setModalVisibleAdd(false);
                resetData();
              }}
              title={'Hủy'}
            />
          </View>
        </View>
      </Modal>
      {/* Cập nhật */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalUpdateService}>
        <View style={styles.centeredViewU}>
          <View style={styles.modalViewU}>
            <Text style={[styles.modalTextU, styles.modalCenter]}>
              Cập nhật
            </Text>
            {hinhAnh ? (
              <View
                onPress={chonAnh}
                style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View
                  style={{
                    borderRadius: 10,
                    width: 100,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{ uri: hinhAnh.assets[0].uri }}
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                  />
                  <TouchableOpacity
                    onPress={chonAnh}
                    style={{ position: 'absolute', bottom: -10, right: -10 }}>
                    <View
                      style={{
                        backgroundColor: '#ccc',
                        padding: 10,
                        borderRadius: 10,
                      }}>
                      <Image
                        source={require('../img/camera.png')}
                        style={{ width: 20, height: 20 }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                onPress={chonAnh}
                style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View
                  style={{
                    backgroundColor: '#ccc',
                    padding: 10,
                    borderRadius: 10,
                    width: 120,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../img/camera.png')}
                    style={{ width: 100, height: 100 }}
                  />
                </View>
              </TouchableOpacity>
            )}
            <TextInputCus
              defaultValue={addDataService.serviceName}
              placeholder="Nhập serviceName"
              onChangeText={text =>
                setaddDataService(prevData => ({
                  ...prevData,
                  serviceName: text,
                }))
              }
            />
            <TextInputCus
              multiline={true}
              defaultValue={addDataService.serviceDescription}
              placeholder="Nhập serviceDescription"
              onChangeText={text =>
                setaddDataService(prevData => ({
                  ...prevData,
                  serviceDescription: text,
                }))
              }
            />
            <ButtonCustom
              style={{ marginTop: 10 }}
              onPress={() => {
                handleUpdateService();
                resetData();
              }}
              title={'Cập nhật'}
            />
            <ButtonCustom
              style={{ marginTop: 10 }}
              onPress={() => {
                setmodalUpdateService(false);
                resetData();
              }}
              title={'Hủy'}
            />
          </View>
        </View>
      </Modal>
      {/* Cập nhật chi tiết */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleUpdate}>
        <View style={styles.centeredViewU}>
          <View style={styles.modalViewU}>
            <Text style={[styles.modalTextU, styles.modalCenter]}>
              Cập nhật
            </Text>
            <TextInputCus
              placeholder="Nhập tên"
              lable="Nhập tên"
              defaultValue={updateDataServiceD.title}
              onChangeText={text =>
                setUpdateDataServiceD(prevData => ({ ...prevData, title: text }))
              }
            />
            <TextInputCus
              placeholder="Nhập giá"
              lable="Nhập giá"
              defaultValue={updateDataServiceD.price + ''}
              onChangeText={text =>
                setUpdateDataServiceD(prevData => ({ ...prevData, price: text }))
              }
            />
            {/* <TextInputCus
              placeholder="Trạng thái"
              lable="Trạng thái"
              defaultValue={updateDataServiceD.status}
              onChangeText={text =>
                setUpdateDataServiceD(prevData => ({ ...prevData, status: text }))
              }
            /> */}
              <RadioGroup  
            radioButtons={radioButtons} 
            onPress={setSelectedId}
            selectedId={selectedId}
            containerStyle={{ flexDirection: 'row', alignItems: 'center' }}
        />
            <ButtonCustom
              style={{ marginTop: 10 }}
              onPress={() => {
                handleUpdate();
              }}
              title="Cập nhật"
            />
            <ButtonCustom
              style={{ marginTop: 10 }}
              onPress={() => {
                setModalVisibleUpdate(false);
              }}
              title="Hủy"
            />
          </View>
        </View>
      </Modal>
      {/* thêm chi tiết */}
      <Modal animationType="fade" transparent={true} visible={modalVisibleAddD}>
        <View style={styles.centeredViewU}>
          <View style={styles.modalViewU}>
            <Text style={[styles.modalTextU, styles.modalCenter]}>
              Thêm chi tiết
            </Text>
            <TextInputCus
              placeholder="Nhập title"
              onChangeText={text =>
                setaddDataServiceD(prevData => ({ ...prevData, title: text }))
              }
            />
            <TextInputCus
              placeholder="Nhập price"
              onChangeText={text =>
                setaddDataServiceD(prevData => ({ ...prevData, price: text }))
              }
            />
            <ButtonCustom
              style={{ marginTop: 10 }}
              onPress={() => {
                serverAddDetail();
                setModalVisibleAddD(false);
              }}
              title={'Thêm chi tiết'}
            />
            <ButtonCustom
              style={{ marginTop: 10 }}
              onPress={() => {
                setModalVisibleAddD(false);
              }}
              title={'Hủy'}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ServiceManagementScreen;

const styles = StyleSheet.create({
  centeredViewU: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalViewU: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
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
    color: 'black',
  },
  modalCenter: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  roww: {
    flex: 1,
    flexDirection: 'row',
  },
  star: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  em: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
