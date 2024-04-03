import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import ButtonCustom from '../components/ButtonCustom';
import {Modal} from 'react-native';
import {RadioGroup} from 'react-native-radio-buttons-group';

const url = `${BASE_URL}/employees`;
const DetailEmployeeScreen = ({navigation, route}) => {
  console.log(route);
  const refreshList = route.params.refreshList;
  const [DetailEmployee, setDetailEmployee] = useState(route.params.item);

  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [status, setStatus] = useState(DetailEmployee.status);

  const radioButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'Đang hoạt động',
        value: 1,
      },
      {
        id: '0',
        label: 'Đã nghỉ việc',
        value: 0,
      },
    ],
    [],
  );

  const [selectedId, setSelectedId] = useState();

  //update
  const handleUpdate = () => {
    //tạo sối tượng dữ liệu
    const _id = DetailEmployee._id;

    const objEmployee = {
      username: DetailEmployee.username,
      password: DetailEmployee.password,
      fullName: DetailEmployee.fullName,
      email: DetailEmployee.email,
      adress: DetailEmployee.adress,
      phoneNumber: DetailEmployee.phoneNumber,
      note: DetailEmployee.note,
      role: DetailEmployee.role,
      image: DetailEmployee.image,
      status: selectedId == 0 ? 0 : 1,
    };

    let url_api = url + '/' + _id;

    fetch(url_api, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objEmployee),
    })
      .then(res => {
        if (res.status == 200) alert('Update is succesfully');
        setDetailEmployee(objEmployee);
        refreshList();
      })
      .catch(ex => {
        console.log(ex);
      });
  };

  return (
    <View>
      <View style={styles.v1}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../img/arrowleft.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>Thông tin chi tiết</Text>
        <View></View>
      </View>
      {DetailEmployee.image === '' ? (
        <Image source={require('../img/avt.png')} style={styles.img} />
      ) : (
        <Image
          source={{uri: DetailEmployee.image}}
          style={styles.img}
          resizeMode="cover"
        />
      )}

      <Text
        style={{
          color: 'black',
          fontSize: 20,
          fontWeight: '500',
          alignSelf: 'center',
          marginBottom: 20,
        }}>
        {DetailEmployee.fullName}
      </Text>
      <View style={styles.tt}>
        <Text style={styles.txt1}>Username: </Text>
        <Text>{DetailEmployee.username}</Text>
      </View>
      <View style={styles.tt}>
        <Text style={styles.txt1}>Email: </Text>
        <Text>{DetailEmployee.email}</Text>
      </View>
      <View style={styles.tt}>
        <Text style={styles.txt1} numberOfLines={2} ellipsizeMode="tail">
          Địa chỉ:{' '}
        </Text>
        <Text>{DetailEmployee.adress}</Text>
      </View>
      <View style={styles.tt}>
        <Text style={styles.txt1}>Số điện thoại: </Text>
        <Text>{DetailEmployee.phoneNumber}</Text>
      </View>
      <View style={styles.tt}>
        <Text style={styles.txt1}>Chức vụ: </Text>
        <Text>{DetailEmployee.role}</Text>
      </View>
      <View style={styles.tt}>
        <Text style={styles.txt1}>Ghi chú: </Text>
        <Text>{DetailEmployee.note}</Text>
      </View>
      <View style={styles.tt}>
        <Text style={styles.txt1}>Trạng thái: </Text>
        {DetailEmployee.status == 1 ? (
          <Text>Đang hoạt động</Text>
        ) : (
          <Text>Đã nghỉ việc</Text>
        )}
      </View>
      <ButtonCustom
        title="Cập nhật thông tin"
        style={{marginHorizontal: 30, marginTop: 30}}
        onPress={() => {
          setVisibleModalEdit(true);

          //
          {
            status === 0 ? setSelectedId('0') : setSelectedId('1');
          }
        }}
      />
      {/* modal update */}
      <Modal
        animationType="slide"
        visible={visibleModalEdit}
        transparent={true}>
        <View style={styles.modalEdit}>
          <View style={styles.dialogEdit}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
                marginBottom: 5,
              }}>
              Cập nhật trạng thái
            </Text>
            <View style={{height: 40}}>
              <RadioGroup
                radioButtons={radioButtons}
                onPress={setSelectedId} //thay đổi khi chọn các radio
                selectedId={selectedId} //trạng thái được chọn ban đầu
                containerStyle={{alignItems: 'flex-start'}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <TouchableOpacity
                style={styles.btnEdit}
                onPress={() => {
                  setVisibleModalEdit(false);
                  handleUpdate(DetailEmployee._id);
                }}>
                <Text style={{color: 'white', fontWeight: '500'}}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVisibleModalEdit(false)}>
                <Text style={{color: 'black'}}>Cancle</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DetailEmployeeScreen;

const styles = StyleSheet.create({
  v1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  title: {
    color: 'black',
    fontWeight: '500',
    alignSelf: 'center',
    fontSize: 20,
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 10,
  },

  tt: {
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    paddingVertical: 7,
    flexDirection: 'row',
    lineHeight: 5,
    marginHorizontal: 30,
    marginBottom: 5,
    alignItems: 'center',
  },
  txt1: {fontSize: 16, fontWeight: '500'},
  menuContainer: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },
  menuItem: {
    paddingVertical: 8,
  },
  modalEdit: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba( 128, 128, 128, 0.5 )',
  },
  dialogEdit: {
    alignItems: 'center',
    margin: 40,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },
  btnEdit: {
    marginRight: 50,
    backgroundColor: '#409087',
    padding: 10,
    borderRadius: 15,
  },
});
