import { StyleSheet, Text, View, Button, Alert, TextInput, ScrollView, Pressable, Image, FlatList, Touchable } from 'react-native'
import React, { useState, Component, useCallback, useEffect } from 'react'
import { Calendar } from 'react-native-calendars';
import ButtonCustom from '../components/ButtonCustom';

import BASE_URL from '../base/BASE_URL';

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
  const [dsSale, setdsSale] = useState([]);
  const [sortSale, setsortSale] = useState([]);
  const [show, setshow] = useState(true);

  //tổng doanh thu
  const fetchTotalRevenue = async () => {
    try {
      const response = await fetch(`${BASE_URL}/revenue?startDate=${start}&endDate=${end}`);
      const data = await response.json();
      setTotalRevenue(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // //lấy ds
  const fetchSale = async () => {
    try {
      const resSale = await fetch(`${BASE_URL}/sales?startDate=${start}&endDate=${end}`);
      const data = await resSale.json();
      setdsSale(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const fetchSortSale = async () => {
    try {
      const resSale = await fetch(`${BASE_URL}/sales?startDate=${start}&endDate=${end}`);
      const data = await resSale.json();

      const sortedData = data.sort((a, b) => b.totalPrice - a.totalPrice);

      setsortSale(sortedData);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // tes 
  const ItemSale = ({ item }) => {
    return (
      <View style={styles.cen}>
        <View style={{ flexDirection: 'column', width: '50%' }}>
          <Text style={styles.leftText}>Service Name : {item.serviceName}</Text>
          <Text style={styles.leftText}>Count: {item.count}</Text>
        </View>
        <View style={{ flexDirection: 'column', width: '50%' }}>
          <Text style={styles.rightText}>Total price: {item.totalPrice}</Text>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {/* Bắt đầu */}
      <View style={styles.roww}>
        <ButtonCustom
          style={styles.butto}
          title='Bắt đầu'
          onPress={() => setcalendarVisile(true)}
        />
        <Text style={{ flex: 1 }}>{start}</Text>
        <Image style={{ width: 20, height: 20 }} source={require('../img/calendar.png')} />
      </View>
      {/* Kết thúc */}
      <View style={styles.roww}>
        <ButtonCustom
          style={styles.butto}
          title='Kết thúc'
          onPress={() => setcalendarVisileE(true)}
        />
        <Text style={{ flex: 1 }}>{end}</Text>
        <Image style={{ width: 20, height: 20 }} source={require('../img/calendar.png')} />
      </View>
      {/* Hàng 3 */}
      {
        calendarVisileE && (
          <View style={styles.calender}>
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
      {calendarVisile && (
        <View style={styles.calender}>
          <Calendar
            onDayPress={handleStart}
            markedDates={{
              [start]: { selected: true, marked: true }
            }}
          />
          <Button title='ok' onPress={() => setcalendarVisile(false)} />
        </View>
      )}

      <Pressable
        style={{ backgroundColor: '#409087', width: '97%', alignItems: 'center', padding: 10 }}
        onPress={() => {
          fetchTotalRevenue();
          fetchSale();
          fetchSortSale()
        }} >
        <Text style={{ color: 'white' }}>Xem thống kê</Text>
      </Pressable>
      <View style={[styles.roww]}>

        <Pressable
          style={styles.buttontwo}
          onPress={() => { setshow(true) }} >
          <Text style={{ color: 'white' }}>Doanh số</Text>
        </Pressable>

        <Pressable
          style={[styles.buttontwo, { borderLeftColor: 'white', borderLeftWidth: 5 }]}
          onPress={() => { setshow(false) }}>
          <Text style={{ color: 'white' }}>Sắp xếp</Text>
        </Pressable>
      </View>

      <View style={{ maxHeight: 400 }}>
        <FlatList
          data={show ? dsSale : sortSale}
          keyExtractor={item => item.idService}
          renderItem={({ item }) => {
            return <ItemSale item={item} />
          }}
          nestedScrollEnabled={true}
          scrollEnabled={true} />
      </View>
      <View style={{ backgroundColor: '#409087', width: '97%', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>Tổng doanh thu</Text>
        <Text style={{ color: 'white' }}>{totalRevenue}</Text>
      </View>
    </View>
  );
}

export default SalesByService

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 30
  },
  roww: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 5
  },
  butto: {
    width: 100,
    height: 40,
    marginHorizontal: 10,
  },
  calender: {
    width: 300,
    height: 50,
    marginHorizontal: 10,
    zIndex: 1000000
  },

  leftText: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 'bold'
  },
  rightText: {
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'flex-end'
  },
  buttontwo: {
    backgroundColor: '#409087',
    width: '50%',
    alignItems: 'center',
    padding: 10
  },
  cen: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#409087',
    margin: 10,
    borderWidth: 2,
    padding: 5,
    borderRadius: 5
  }
})