import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const HomeScreen = ({navigation}) => {
  return (
    <View>
      <Text onPress={() => navigation.replace('Detail')}>HomeScreen</Text>
    </View>
  )
}
const DetailScreen = ({navigation}) => {
  return (
    <View>
      <Text onPress={() => navigation.replace('Home')}>DetailScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})