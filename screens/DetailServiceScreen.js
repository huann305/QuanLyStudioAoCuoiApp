// import React, { useCallback, useState, useEffect } from 'react';
// import { View, Text, Image } from 'react-native';

// import BASE_URL from '../base/BASE_URL';
// import { Checkbox } from 'react-native-paper';
// const URL_detailService = `${BASE_URL}/servicedetails`;

// const DetailServiceScreen = ({ route }) => {
//     const [detailService, setdetailService] = useState([]);
//     const idItem = route.params.idItem;
//     const [newDetail, setnewDetail] = useState();
//     const [statusU, setstatusU] = useState('');
//     const [checked, setchecked] = useState(false);

//     // useEffect(() => {
//     //     const newDetail = detailService.find(x => x.idService._id === idItem);
//     //     setnewDetail(newDetail);
//     // }, [newDetail, detailService, idItem]);

//     const detailServiceData = useCallback(() => {
//         fetch(URL_detailService + `?idService=${idItem}`)
//             .then(response => response.json())
//             .then(json => setdetailService(json))
//             .catch(error => {
//                 console.error(error);
//             });
//     }, []);

//     useEffect(() => {
//         detailServiceData();
//     }, [detailServiceData]);
//     //hiện thị đã tích , chưa tích
//     // useEffect(() => {
//     //     setstatusU(detailService.status) === 'Tạm dừng';
//     //     console.log(idItem.status);
//     // }, [statusU, idItem, detailService]);
//     return (
//         <View>
//             {detailService.idService.image && <Image style={{ width: 100, height: 100 }} source={{ uri: detailService.idService.image }} />}
//             <Text>{detailService.idService.serviceName}</Text>
//             <Text>{detailService.idService.description}</Text>
//             <Text>{newDetail.price}</Text>
//             <Text>{newDetail.title}</Text>
//             {/* <Checkbox
//                 status={checked === statusU ? 'checked' : 'unchecked'}
//                 onPress={() => setchecked(!checked)}
//             /> */}

//         </View>
//     );
// }

// export default DetailServiceScreen;
import React from 'react';
import { View, Text } from 'react-native';

const DetailServiceScreen = () => {
  return (
    <View>
      <Text></Text>
    </View>
  );
}

export default DetailServiceScreen;
