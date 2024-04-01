import { StyleSheet, Text, View, Button, Alert, TextInput, ScrollView, Pressable } from 'react-native'
import React, { useState, Component, useCallback, useEffect } from 'react'
import { Calendar } from 'react-native-calendars';
import DropDownPicker from 'react-native-dropdown-picker';

import ButtonCustom from '../components/ButtonCustom';
import TextInputCustom from '../components/TextInputCustom';
import TotalComponent from '../components/TotalComponent';

import BASE_URL from '../base/BASE_URL';
import { Image } from 'react-native-elements';
const URL_services = `${BASE_URL}/services`;

const SalesByService = () => {
  const [calendarVisile, setcalendarVisile] = useState(false);
  const [calendarVisileE, setcalendarVisileE] = useState(false);
  const [start, setstart] = useState('');
  const [end, setend] = useState('');

  const handleStart = (day) => {
    setstart(day.dateString);
  };
  const handleEnd = (day) => {
    setend(day.dateString);
  };
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [totalRevenueDichVu, setTotalRevenueDichVu] = useState(null);
  //tổng
  const fetchTotalRevenue = async () => {
    try {
      const response = await fetch(`${BASE_URL}/revenue?startDate=${start}&endDate=${end}`);
      const data = await response.json();
      setTotalRevenue(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //hiện thị spinner
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [items, setItems] = useState([]);

  const servicesData = useCallback(() => {
    fetch(URL_services)
      .then(response => response.json())
      .then(json => {
        const convertedItems = json.map(service => ({
          label: service.serviceName,
          value: service._id,
        }));
        setItems(convertedItems);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    servicesData();
  }, [servicesData]);


  const handleCalculateRevenue = async () => {
    try {
      if (!start || !end || !value) {
        Alert.alert('nhập đủ thông tin');
        return;
      }
      const response = await fetch(`${BASE_URL}/totalServicePrice?startDate=${start}&endDate=${end}&idService=${value}`);
      const data = await response.json();
      setTotalRevenueDichVu(data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lấy dữ liệu');
    }
  };

  return (
    <View style={styles.container}>
    {/* Bắt đầu */}
    <View style={styles.roww}>
      <ButtonCustom
        style={styles.butto}
        title='Bắt đầu'
        onPress={() => setcalendarVisile(true)} 
        />
      {calendarVisile && ( 
        <View>
          <Calendar
            onDayPress={handleStart}
            markedDates={{
              [start]: { selected: true, marked: true }
            }}
          />
          <Button title='ok' onPress={() => setcalendarVisile(false)} />
        </View>
      )}
      <TextInput style={{ flex: 1 }} value={start}/>
      <Image style={{ width: 20, height: 20 }} source={require('../img/calendar.png')} />
    </View>
    {/* Kết thúc */}
    <View style={styles.roww}>
      <ButtonCustom
        style={styles.butto}
        title='Kết thúc'
        onPress={() => setcalendarVisileE(true)}
        />
        {
        calendarVisileE && (
          <View>
            <Calendar
              onDayPress={handleEnd}
              markedDates={{
                [end]: { selected: true, marked: true }
              }}
            />
            <Button title='ok' onPress={() => {
              setcalendarVisileE(false);
            }} />
          </View>
        )}
      <TextInput style={{ flex: 1 }} value={end}/>
      <Image style={{ width: 20, height: 20 }} source={require('../img/calendar.png')} />
    </View>   
    {/* Hàng 3 */}
    <View style={[styles.roww, { justifyContent: 'space-between', alignItems: 'center' }]}>
      <View style={{ width: 150 }}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          theme="DARK"
          multiple={false}
          mode="BADGE"
          maxHeight={400}
          renderBadge={({ item, index }) => (
            <View style={{ backgroundColor: '#007bff', padding: 8, borderRadius: 15 }}>
              <Text style={{ color: '#fff' }}>{item.label}</Text>
            </View>
          )}
        />
      </View>                     
      <ButtonCustom style={styles.butto} title='Thống kê' onPress={() => {fetchTotalRevenue(),
      handleCalculateRevenue()}} />
    </View>

    <TotalComponent
      title='Tổng doanh số'
      total= {totalRevenue}
      uri_img='https://banner2.cleanpng.com/20180715/ffu/kisspng-computer-icons-wallet-geld-icon-5b4b9f6be40655.675625431531682667934.jpg'
    />
    <TotalComponent
      title='Doanh số theo dịch vụ'
      total={totalRevenueDichVu}
      uri_img='https://banner2.cleanpng.com/20180715/ffu/kisspng-computer-icons-wallet-geld-icon-5b4b9f6be40655.675625431531682667934.jpg'
    />
    <TotalComponent
      title='Dịch vụ được thuê nhiều nhất'
      total='dán kq vào đây'
      uri_img='https://banner2.cleanpng.com/20180715/ffu/kisspng-computer-icons-wallet-geld-icon-5b4b9f6be40655.675625431531682667934.jpg'
    />
  </View>
  );
}

export default SalesByService

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30
  },
  roww: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  butto: {
    width: 100,
    height: 40,
    marginHorizontal: 10, 
  }
})