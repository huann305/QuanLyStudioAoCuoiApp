import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler';

const Stack = createStackNavigator()

import { DrawerContent, DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
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

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={{
          height: 150,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: '#409087',
          gap: 10
        }}>
          <Image style={{
            height: 100,
            width: 100, borderRadius: 500
          }} source={{ uri: 'https://th.bing.com/th/id/OIP.2xkM75es8XRe8faa3cec6QHaE7?w=298&h=199&c=7&r=0&o=5&dpr=1.3&pid=1.7' }} />
          <View>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>Vũ Bá Huấn</Text>
            <Text style={{ color: '#D9D9D9' }}>bahuan305@gmail.com</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
        <TouchableOpacity 
        onPress={() => props.navigation.replace('WelcomeScreen')}
        style={{ position: 'absolute', bottom: 20 }}>
          <Text style={{ color: '#686868', marginStart: 18, fontWeight: '500' }}>Đăng xuất</Text>
        </TouchableOpacity>
    </View>
  )
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerStyle: { backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 }, drawerLabelStyle: { color: '#686868' } }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="ServiceManagementScreen" options={{ title: 'Quản lý dịch vụ' }} component={ServiceManagementScreen} />
      <Drawer.Screen name="EmployeeManagementScreen" options={{ title: 'Quản lý nhân viên' }} component={EmployeeManagementScreen} />
      <Drawer.Screen name="TaskManagementScreen" options={{ title: 'Quản lý công việc' }} component={TaskManagementScreen} />
      <Drawer.Screen name="BillManagementScreen" options={{ title: 'Tạo hóa đơn' }} component={BillManagementScreen} />
      <Drawer.Screen name="TotalSalesScreen" options={{ title: 'Tổng doanh số' }} component={TotalSalesScreen} />
      <Drawer.Screen name="SalesByService" options={{ title: 'Doanh số theo dịch vụ' }} component={SalesByService} />
      <Drawer.Screen name="MostServiceScreen" options={{ title: 'Dịch vụ được thuê nhiều nhất' }} component={MostServiceScreen} />
      <Drawer.Screen name="UpdateInforScreen" options={{ title: 'Cập nhật thông tin' }} component={UpdateInforScreen} />
      <Drawer.Screen name="ChangePasswordScreen" options={{ title: 'Đổi mật khẩu' }} component={ChangePasswordScreen} />
    </Drawer.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={MyDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})