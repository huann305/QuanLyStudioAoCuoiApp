import React, {useEffect, useState, StyleSheet} from 'react';
import {View, Text, Image} from 'react-native';

import BASE_URL from '../base/BASE_URL';
const URL_services = `${BASE_URL}/services`;
const URL_servicedetails = `${BASE_URL}/serviceDetails`;

const DetailServiceScreen = ({route}) => {
  const [obj, setobj] = useState({serviceName: '', description: '', image: ''});
  const [objD, setobjD] = useState({title: '', price: ''});

  useEffect(() => {
    fetch(URL_servicedetails + `/${route.params.idItemDetail}`)
      .then(response => response.json())
      .then(json => setobjD(json))
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetch(URL_services + `/${route.params.idItemm}`)
      .then(response => response.json())
      .then(json => setobj(json))
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View>
      <Image source={{uri: obj.image}} />
      <Text>{obj.serviceName}</Text>
      {/* khong hiện text dịch vụ */}
      <Text>{obj.description} + kjjkjjhk</Text>
      <Text>{objD.title}+jnknk</Text>
      <Text>{objD.price}+jnknk</Text>
      <Text>{objD.status}+jnknk</Text>
    </View>
  );
};

export default DetailServiceScreen;
