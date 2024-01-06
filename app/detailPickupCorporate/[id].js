import { StyleSheet, Text, SafeAreaView, View, ScrollView} from 'react-native';
import Header from '../_components/Header';
import Footer from '../_components/Footer';
import { useState, useEffect } from 'react';
import AccordionPickUpCorporate from '../_components/AccordionPickUpCorporate';
import { Skeleton, Dialog } from '@rneui/themed';
import { useLocalSearchParams, router } from 'expo-router';
import CanvasCamera from '../_components/CanvasCamera';
import { HostUri } from '../_components/HostUri';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import CustomDatePick from '../_components/CustomDatePick';
import PickUpReceipt from '../_components/PickUpReceipt';
import * as ImageManipulator from 'expo-image-manipulator';

export default function detailListPickupCorporate() {
    const { id } = useLocalSearchParams();
    const [bigdata, setBigData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('')
    const [loadingHttp, setLoadingHttp] = useState(false);
    const [startCamera, setStartCamera] = useState(false);
    const [showReceipt, setShowReceipt] = useState(false);
    const [imgUri, setImgUri] = useState('');

    const [returnData, setReturnData] = useState({
      order_corporate_id : '',
      selected_choice : '',
      name : '',
      phone : '',
      check : '',
      reason : '',
      company : '',
      total : '',
      weight : '',
    });

    const choiceList = [9, 13];

    const reasonList = ['Dangerous Goods', 'Invalid Address', 'Packing Rusak', 'Paket Belum Siap', 'Alasan Lain'];

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
    await SecureStore.getItemAsync('secured_token').then((token) => {
      axios({
        method: "get",
        url: HostUri+`pickup/corporate/${id}`,
        headers: {
          "Content-Type": 'application/json',
          "Authorization" : `Bearer ${token}`,
        },
      }).then(function (response) {
          // berhasil
          setLoading(false);
          setBigData(response.data.data);
        }).catch(function (error) {
          // masuk ke server tapi return error (unautorized dll)
          if (error.response) {
          setLoading(false);
          //gagal login
          if(error.response.data.message == 'Unauthenticated.' || error.response.data.message == 'Unauthorized')
            {
              SecureStore.deleteItemAsync('secured_token');
              SecureStore.deleteItemAsync('secured_name');
              router.replace('/');
            }
            // console.error(error.response.data);
            // console.error(error.response.status);
            // console.error(error.response.headers);
          } else if (error.request) {
            // ga konek ke server
            setLoading(false);
            alert('Check Koneksi anda !')
            console.error(error.request);
          } else {
            // error yang ga di sangka2
            setLoading(false);
            console.error("Error", error.message);
          }
      });
    });
    }

    const onPressUpdate = (id_return, choice_return = '', name_return = '', check_return = '', reason_return = '', company_return = '', total_return = '', weight_return = '', phone_return = '') => {
      // console.log(id_return);
      // console.log(choice_return);
      // console.log(name_return);
      // console.log(check_return);
      // console.log(reason_return);
      // return false;
      if(choice_return == 1){
        setReturnData({
          order_corporate_id : id_return,
          selected_choice : choice_return,
          name : name_return,
          phone : phone_return,
          check : check_return,
          reason : reason_return,
          company : company_return,
          total : total_return,
          weight : weight_return,
        });
        setStartCamera(true);
      }else{
        updateShipping(id_return, choice_return, name_return, check_return, reason_return, '', phone_return);
      }
    }

    const returnImage = (uri) =>
    {
      setStartCamera(false);
      setImgUri(uri);
      setShowReceipt(true);
      // updateShipping(returnData.order_corporate_id, returnData.selected_choice, returnData.name, returnData.check, returnData.reason, uri);
      // console.log(returnData);
    }

    const updateShipping = async (order_corporate_id, selected_choice, name, check, reason, img='', phone='') =>{
      // choice
       //   {key:'1', value:'Pickup Sukses'},
       //   {key:'2', value:'Pickup Gagal'},
       // ALL REQUEST order_corporate_id, selected_tracking, alasan
       let true_reason = (check == 5) ? reason : reasonList[check-1];
       let formData = new FormData();
       formData.append('order_corporate_id', order_corporate_id);
       formData.append('name', name);
       formData.append('phone', phone);
       formData.append('selected_tracking', choiceList[(selected_choice-1)]);
       formData.append('alasan', true_reason);
       if(img != ''){
         const manipResult = await ImageManipulator.manipulateAsync(
           img,
           [],
           { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
         ); 
         let filename = manipResult.uri.split('/').pop();
         let match = /\.(\w+)$/.exec(filename);
         let type = match ? `image/${match[1]}` : `image`;
         formData.append('img', { uri: manipResult.uri, name: filename, type });
       }
       setLoadingHttp(true);
       await SecureStore.getItemAsync('secured_token').then((token) => {
         let optHeader = { "Content-Type": 'multipart/form-data', "Authorization" : `Bearer ${token}`} ;
      //  console.log(optHeader)
         axios({
         method: "post",
         url: HostUri+'pickup/corporate/update',
         headers: optHeader,
         // data : {
         //   order_corporate_id: order_corporate_id,
         //   selected_tracking: choiceList[(selected_choice-1)],
         //   alasan : true_reason,
         //   img : { uri: img, name: filename, type:type }
         // }
         data : formData
       }).then(function (response) {
           // berhasil
           setLoadingHttp(false);
           setShowReceipt(false)
           setLoading(true);
           getData();
           setLoading(false);
         }).catch(function (error) {
           // masuk ke server tapi return error (unautorized dll)
           if (error.response) {
             //gagal login
             setLoadingHttp(false);
             if(error.response.data.message == 'Unauthenticated.' || error.response.data.message == 'Unauthorized')
             {
               SecureStore.deleteItemAsync('secured_token');
               SecureStore.deleteItemAsync('secured_name');
               router.replace('/');
             }else{
              alert('fail to update')
             }
             console.error(error.response.data);
             console.error(error.response.status);
             console.error(error.response.headers);
           } else if (error.request) {
             // ga konek ke server
             setLoadingHttp(false);
             setShowReceipt(false)
             alert('Check Koneksi anda !')
             console.error(error.request);
           } else {
             setLoadingHttp(false);
             setShowReceipt(false)
             // error yang ga di sangka2
             console.error("Error", error.message);
           }
       });
   });
     }

    const onCreateReceipt = (name, hp) => {
      setLoadingHttp(true);
      updateShipping(returnData.order_corporate_id, returnData.selected_choice, name, returnData.check, returnData.reason, imgUri.uri, hp);
    }

     const onBackReceipt = () => {
      setShowReceipt(false);
      setReturnData({
        order_corporate_id : '',
        selected_choice : '',
        name : '',
        phone : '',
        check : '',
        reason : '',
        company : '',
        total : '',
        weight : '',
      });
     }

    return (
        <SafeAreaView style={styles.container}>
        {
          loadingHttp && 
          <Dialog isVisible={loadingHttp} overlayStyle={{backgroundColor:'rgba(52, 52, 52, 0.5)' }}>
            <Dialog.Loading />
          </Dialog>
        }
          <View style={styles.headerContainer}>
            <Header/>
          </View>
          
          {!startCamera && !showReceipt &&
          <View style={styles.datepickContainer}>
            <View >
              <CustomDatePick />
            </View>
            <View>
              <CustomDatePick />
            </View>
          </View>
          }
          <View style={styles.listContainer}>
          { showReceipt &&
            <PickUpReceipt sender={returnData.company} total={returnData.total} weight={returnData.weight} img={imgUri} onCreate={onCreateReceipt} onBack={onBackReceipt}/>
          }

          {
            startCamera &&
            <CanvasCamera startCamera={startCamera} returnImage = {returnImage}/>
          }
          {!startCamera && !showReceipt &&
            (
            <ScrollView >
            {
              bigdata.length == 0 && !loading &&
              <Text>No Data Found</Text>
            }
            
            {
                loading &&
                <View style={{ flex:1, flexDirection:'column', padding:5 }}>
                  {
                    [{},{},{},{},{},{},].map((l, i) => (
                      <Skeleton
                      // LinearGradientComponent={LinearGradient}
                      animation="pulse"
                      width={'100%'}
                      height={60}
                      style={{ marginBottom:5 }}
                      key={i}
                    />
                      ))
                  }
                </View>
                
              }
              {
                bigdata.map((l, i) => (
                    <AccordionPickUpCorporate data={ l } onPressUpdate ={onPressUpdate} key={i} reasonList = {reasonList} />
                ))
              }
            </ScrollView>
            )}
              </View>
            <View>
          <Footer />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection:'column',
  },
  headerContainer : {
    // height:'10%'
    flex:1
  },
  listContainer : {
    // height:'70%',
    flex:9,
    paddingHorizontal:10
  },
  datepickContainer : { 
    // height:'10%',
    flex:1,
    flexDirection : 'row', 
    alignItems: "center", 
    justifyContent: "space-evenly" 
  },
});