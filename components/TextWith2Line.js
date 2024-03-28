import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TextWith2Line = ({children}) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
            <View style={styles.lineGray} />
            <Text style={{ color: '#737373' }}>   {children}   </Text>
            <View style={styles.lineGray} />
        </View>
    )
}

export default TextWith2Line

const styles = StyleSheet.create({
    lineGray: {
        backgroundColor: '#737373',
        flex: 1,
        height: 1
    },
})