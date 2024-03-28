import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const IconWithBorder = ({src}) => {
    return (
        <TouchableOpacity style={styles.btnIcon}>
            <Image style={styles.imgIcon} source={src} />
        </TouchableOpacity>
    )
}

export default IconWithBorder

const styles = StyleSheet.create({
    imgIcon: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    btnIcon: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#737373',
        borderRadius: 15
    },
})