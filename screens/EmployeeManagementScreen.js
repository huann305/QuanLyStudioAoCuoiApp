import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import BASE_URL from '../base/BASE_URL';
import {Modal} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {Button} from 'react-native-elements';

//url
const url = `${BASE_URL}/employees`;

const EmployeeManagementScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  //dùng index => index thay đổi thì sẽ load lạiflastlist
  const [index, setindex] = useState(0);
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);
  //
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errFullName, setErrFullName] = useState(null);
  const [errUserName, setErrUsername] = useState(null);
  const [errPassword, setErrPassword] = useState(null);
  const [errEmail, setErrEmail] = useState(null);
  const [errPhone, setErrPhone] = useState(null);
  const [uri, setUri] = useState(null);

  //
  const [hinhAnh, setHinhAnh] = useState(null);
  const chupAnh = useCallback(() => {
    // định nghĩa option để gắn cho imagepicker
    let option = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true,
    };
    // khởi động camera để chụp ảnh
    ImagePicker.launchCamera(option, setHinhAnh);
  }, []);
  useEffect(() => {
    console.log('hinh: ' + hinhAnh?.assets[0].uri);
    setUri(hinhAnh?.assets[0].uri);
    console.log('URI: ' + uri);
  }, [hinhAnh]);
  const chonAnh = useCallback(() => {
    // định nghĩa option để gắn cho imagepicker
    let option = {
      mediaType: 'photo',
      selectionLimit: 0,
    };
    // khởi động camera để chụp ảnh
    ImagePicker.launchImageLibrary(option, setHinhAnh);
  }, []);

  const uploadImage = async () => {
    validate();
    if (
      errFullName == '' &&
      errEmail == '' &&
      errPassword == '' &&
      errUserName == '' &&
      errPhone == ''
    ) {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('fullName', fullName);
      formData.append('email', email);
      // formData.append('address', adress);
      formData.append('address', '');

      formData.append('phoneNumber', phoneNumber);
      // formData.append('note', note);
      formData.append('note', '');

      // formData.append('role', role);
      formData.append('role', '');

      // Kiểm tra xem hinhAnh và hinhAnh?.assets có tồn tại và không rỗng
      if (hinhAnh && hinhAnh?.assets && hinhAnh?.assets.length > 0) {
        // Truy cập vào URI nếu tồn tại
        formData.append('image', {
          uri: hinhAnh?.assets[0]?.uri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });
      }

      formData.append('status', 1);
      console.log('uri up: ' + uri);

      try {
        const response = await fetch(url, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            // Add any additional headers needed for authentication etc.
          },
        });
        const data = await response.json();
        Alert.alert('Thêm thành công');
        setPassword('');
        setUsername('');
        setFullName('');
        setEmail('');
        setindex(response.json.length);
        setPhoneNumber('');
        setVisibleModalAdd(false);
        //thêm thành công, gọi hàm getListEmployees để ud ds
        getListEmployees();
        setHinhAnh(null);
        console.log('Upload successful:', data);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  //fetch danh sách nhân viên
  const getListEmployees = async () => {
    try {
      const res = await fetch(url);
      const result = await res.json();
      setData(result);
      console.log('Fetching data is succesfully');
    } catch (err) {
      console.error('Error fetching data: ' + err);
    }
  };
  //cập nhật lại danh sách sau khi cập nhật item bên DetailEmp
  const refreshList = () => {
    getListEmployees();
  };
  //useEffect
  useEffect(() => {
    getListEmployees();
  }, []);

  //thêm mới nhân viên
  const handleAdd = () => {
    validate();
    if (
      errFullName == '' &&
      errEmail == '' &&
      errPassword == '' &&
      errUserName == '' &&
      errPhone == ''
    ) {
      console.log(username, password);
      // Tạo đối tượng dữ liệu
      let objEmployee = {
        username: username,
        password: password,
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        note: '',
        role: 'Đang cập nhật',
        image: '',
        status: '1',
      };
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objEmployee),
      })
        .then(res => {
          if (res.status === 200) {
            Alert.alert('Thêm thành công');
            setPassword('');
            setUsername('');
            setFullName('');
            setEmail('');
            setindex(res.json.length);
            setPhoneNumber('');
            setVisibleModalAdd(false);
            //thêm thành công, gọi hàm getListEmployees để ud ds
            getListEmployees();
          } else {
            throw new Error('Thêm không thành công');
          }
        })
        .catch(error => {
          console.error('Thêm không thành công:', error);
        });
    } else return;
  };
  const validate = () => {
    if (fullName == '') {
      setErrFullName('Không bỏ trống thông tin');
    } else {
      setErrFullName('');
    }
    if (username == '') {
      setErrUsername('Không bỏ trống thông tin');
    } else {
      setErrUsername('');
    }
    if (password == '') {
      setErrPassword('Không bỏ trống thông tin');
    } else if (password.length <= 6) {
      setErrPassword('Mật khẩu phải có từ 6 ký tự trở lên');
    } else {
      setErrPassword('');
    }
    if (email == '') {
      setErrEmail('Không bỏ trống thông tin');
    } else if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
      setErrEmail('Email chưa đúng định dạng');
    } else {
      setErrEmail('');
    }
    const regexPhone = /^0\d{9}$/;
    if (phoneNumber == '') {
      setErrPhone('Không bỏ trống thông tin');
    } else if (!regexPhone.test(phoneNumber)) {
      setErrPhone('Số điện thoại chưa đúng định dạng');
    } else {
      setErrPhone('');
    }
  };

  //item
  const ItemEmployee = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.itemE}
          onPress={() => {
            navigation.navigate('DetailEmployeeScreen', {item, refreshList});
          }}>
          {item.image == '' ? (
            <Image
              source={require('../img/avt.png')}
              resizeMode="cover"
              style={styles.img}
            />
          ) : (
            <Image
              source={{
                uri: item.image,
              }}
              resizeMode="cover"
              style={styles.img}
            />
          )}

          <View style={styles.tt}>
            <Text style={{color: 'black', fontWeight: '500', fontSize: 18}}>
              {item.fullName}
            </Text>
            <Text>Chức vụ: {item.role}</Text>
            <Text>
              Trang thái:{' '}
              {item.status == 1 ? (
                <Text>Đang hoạt động</Text>
              ) : (
                <Text>Đã nghỉ việc</Text>
              )}
            </Text>
          </View>
          <Image source={require('../img/chevron.png')} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.ctn}>
      <TouchableOpacity onPress={() => {}}>
        <Image
          source={require('../img/filter.png')}
          style={{alignSelf: 'flex-end', marginVertical: 5}}
        />
      </TouchableOpacity>
      <View style={styles.search}>
        <Image
          source={require('../img/search-interface-symbol.png')}
          style={{width: 24, height: 24}}
        />
        <TextInput placeholder="Search" />
      </View>
      <ScrollView style={{flex: 10}}>
        <FlatList
          data={data}
          keyExtractor={item => item._id}
          extraData={index}
          renderItem={({item}) => {
            return <ItemEmployee item={item} />;
          }}
          nestedScrollEnabled={false}
          scrollEnabled={false}
        />
      </ScrollView>

      <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <TouchableOpacity
          style={styles.btnAdd}
          onPress={() => setVisibleModalAdd(true)}>
          <Text style={{color: 'white', fontSize: 30}}>+</Text>
        </TouchableOpacity>
      </View>
      {/* modal thêm mới */}
      <Modal animationType="slide" visible={visibleModalAdd} transparent={true}>
        <View style={styles.modalEdit}>
          <View style={styles.dialogEdit}>
            <Text style={styles.titleModal}>Thêm mới nhân viên</Text>
            {/* // */}

            {/* <Image
              key={index}
              source={{uri: uri}}
              style={{width: 200, height: 200}}
            /> */}

            {typeof hinhAnh?.assets != 'undefined' ? (
              hinhAnh?.assets.map((objImage, index) => {
                return (
                  <View key={index} style={{margin: 10, alignSelf: 'center'}}>
                    <Image
                      key={index}
                      source={{uri: objImage.uri}}
                      style={{width: 140, height: 140}}
                    />
                  </View>
                );
              })
            ) : (
              <View key={index} style={{margin: 10, alignSelf: 'center'}}>
                <Image
                  key={index}
                  source={require('../img/add_pic.png')}
                  style={{width: 140, height: 140}}
                />
              </View>
            )}
            {/* // */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <TouchableOpacity onPress={chupAnh} style={styles.btnAddAnh}>
                <Image source={require('../img/camera.png')} />
                <Text style={{color: '#409087'}}> Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={chonAnh} style={styles.btnAddAnh}>
                <Image source={require('../img/upload.png')} />

                <Text style={{color: '#409087'}}> Upload</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="Fullname"
              style={styles.textInput}
              value={fullName}
              onChangeText={setFullName}
            />
            <Text style={styles.err}>{errFullName}</Text>
            <TextInput
              placeholder="Username"
              style={styles.textInput}
              value={username}
              onChangeText={setUsername}
            />
            <Text style={styles.err}>{errUserName}</Text>
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              value={password}
              onChangeText={setPassword}
            />
            <Text style={styles.err}>{errPassword}</Text>
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.err}>{errEmail}</Text>
            <TextInput
              placeholder="Phonenumber"
              style={styles.textInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <Text style={styles.err}>{errPhone}</Text>

            <View style={styles.btnModal}>
              <TouchableOpacity onPress={uploadImage} style={styles.btnThem}>
                <Text style={{color: 'white'}}>Thêm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btnThem, {backgroundColor: 'white'}]}
                onPress={() => {
                  setVisibleModalAdd(false);
                }}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EmployeeManagementScreen;

const styles = StyleSheet.create({
  ctn: {
    marginHorizontal: 15,
    flexDirection: 'column',
    flex: 1,
  },
  search: {
    backgroundColor: '#EEEDEB',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 40,
    marginBottom: 20,
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
  modalEdit: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba( 128, 128, 128, 0.5 )',
  },
  dialogEdit: {
    // alignItems: 'center',
    margin: 40,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  btnAdd: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#409087',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  textInput: {
    borderRadius: 15,
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingVertical: 5,
    width: 250,
    paddingHorizontal: 20,
  },
  err: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
    alignItems: 'flex-start',
  },
  btnThem: {
    width: 100,
    backgroundColor: '#409087',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    borderRadius: 15,
  },
  btnAddAnh: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#409087',
    flexDirection: 'row',
  },
  titleModal: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  btnModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
});
