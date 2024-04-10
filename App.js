import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ServiceManagementScreen from './screens/ServiceManagementScreen';
import EmployeeManagementScreen from './screens/EmployeeManagementScreen';
import TaskManagementScreen from './screens/TaskManagementScreen';
import BillManagementScreen from './screens/BillManagementScreen';
import TotalSalesScreen from './screens/TotalSalesScreen';
import SalesByService from './screens/SalesByService';
import MostServiceScreen from './screens/MostServiceScreen';
import UpdateInforScreen from './screens/UpdateInforScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import DataContext from './screens/Context/DataContext';
import RegisterScreen from './screens/RegisterScreen';
import DetailServiceScreen from './screens/DetailServiceScreen';
import DetailEmployeeScreen from './screens/DetailEmployeeScreen';
import AddBill from './screens/AddBill';
import DetailBill from './screens/DetailBill';
import EmployeeListScreen from './screens/EmployeeListScreen';
import EmployeeAddScreen from './screens/EmployeeAddScreen';
import EmloyeeTask from './screens/EmloyeeTask';
const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
  const data = useContext(DataContext);
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        {/* <View
          style={{
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: '#409087',
            gap: 10,
          }}>
          <Image
            style={{
              height: 100,
              width: 100,
              borderRadius: 500,
            }}
            source={{uri: data.image}}
          />
          <View>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>
              {data.fullName == '' ? 'Chưa cập nhật tên' : data.fullName}
            </Text>
            <Text style={{ color: '#D9D9D9' }}>
              {data.email == '' ? 'Chưa cập nhật email' : data.email}
            </Text>
            <Text style={{ color: '#D9D9D9' }}>{data.role}</Text>
          </View>
        </View> */}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        onPress={() => props.navigation.replace('WelcomeScreen')}
        style={{position: 'absolute', bottom: 20}}>
        <Text style={{color: '#686868', marginStart: 18, fontWeight: '500'}}>
          Đăng xuất
        </Text>
      </TouchableOpacity>
    </View>
  );
};

function MyDrawer({route}) {
  return (
    <DataContext.Provider value={route.params}>
      <Drawer.Navigator
        initialRouteName="TaskManagementScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          drawerLabelStyle: {color: '#686868'},
        }}
        drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen
          name="AddBill"
          options={{title: 'Tạo hóa đơn'}}
          component={AddBill}
        />
        <Drawer.Screen
          name="BillManagementScreen"
          options={{title: 'Quản lý hóa đơn'}}
          component={BillManagementScreen}
        />

        <Drawer.Screen
          name="ServiceManagementScreen"
          options={{title: 'Quản lý dịch vụ'}}
          component={ServiceManagementScreen}
        />
        <Drawer.Screen
          name="EmployeeManagementScreen"
          options={{title: 'Quản lý nhân viên'}}
          component={EmployeeManagementScreen}
        />
        <Drawer.Screen
          name="TaskManagementScreen"
          options={{title: 'Quản lý công việc'}}
          component={TaskManagementScreen}
        />

        {/* <Drawer.Screen
          name="TotalSalesScreen"
          options={{ title: 'Tổng doanh số' }}
          component={TotalSalesScreen}
        /> */}
        <Drawer.Screen
          name="SalesByService"
          options={{title: 'Doanh số theo dịch vụ'}}
          component={SalesByService}
        />
        <Drawer.Screen
          name="EmployeeTask"
          options={{title: 'Công việc của tôi'}}
          component={EmloyeeTask}
        />
        {/* <Drawer.Screen
          name="MostServiceScreen"
          options={{ title: 'Dịch vụ được thuê nhiều nhất' }}
          component={MostServiceScreen}
        /> */}
        <Drawer.Screen
          name="UpdateInforScreen"
          options={{title: 'Cập nhật thông tin'}}
          component={UpdateInforScreen}
        />
        <Drawer.Screen
          name="ChangePasswordScreen"
          options={{title: 'Đổi mật khẩu'}}
          component={ChangePasswordScreen}
        />
      </Drawer.Navigator>
    </DataContext.Provider>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="EmployeeList" component={EmployeeListScreen} />
        <Stack.Screen name="AddEmployee" component={EmployeeAddScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={MyDrawer} />

        <Stack.Screen
          name="TaskManagementScreen"
          component={TaskManagementScreen}
        />
        <Stack.Screen
          name="EmployeeManagementScreen"
          component={EmployeeManagementScreen}
        />
        <Stack.Screen
          name="DetailServiceScreen"
          component={DetailServiceScreen}
        />
        <Stack.Screen
          name="ServiceManagementScreen"
          component={ServiceManagementScreen}
        />
        <Stack.Screen
          name="DetailEmployeeScreen"
          component={DetailEmployeeScreen}
        />
        <Stack.Screen
          name="BillManagementScreen"
          component={BillManagementScreen}
        />
        <Stack.Screen name="AddBill" component={AddBill} />
        <Stack.Screen name="DetailBill" component={DetailBill} />
        <Stack.Screen name="EmployeeTask" component={EmloyeeTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
