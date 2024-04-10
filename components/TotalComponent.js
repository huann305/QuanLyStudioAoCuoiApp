import React from 'react';
import { View, Text, Image } from 'react-native';

const TotalComponent = ({ uri_img, title, total }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#99D1D3', width: 300,padding: 20, borderRadius: 10, margin: 10 }}>
            <Image source={{ uri: uri_img }} style={{ width: 40, height: 40, marginRight: 50}} />
            <View>
                <Text style={{color :'#007F54', fontWeight: 'bold'}}>{title}</Text>
                <Text style={{width: 150, color :'#007F54', backgroundColor: 'white', padding: 10, borderRadius: 5}}>{total}</Text>
            </View>
        </View>

    );
}

export default TotalComponent;
