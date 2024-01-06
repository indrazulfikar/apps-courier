import { StyleSheet, Text, SafeAreaView, View, ScrollView} from 'react-native';
import Header from './_components/Header';
import Footer from './_components/Footer';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import AccordionPending from './_components/AccordionPending'
import { Divider, Skeleton, Dialog } from '@rneui/themed';
import CanvasCamera from './_components/CanvasCamera';
import { HostUri } from './_components/HostUri';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import * as ImageManipulator from 'expo-image-manipulator';


export default function listDeliveryPending() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [err, setErr] = useState('Disconnected Please Check your Connection !');
  const [startCamera, setStartCamera] = useState(false);
  const [loadingHttp, setLoadingHttp] = useState(false);

  const [returnData, setReturnData] = useState({
    shipping_id : '',
    selected_choice : '',
    name : '',
    check : '',
    reason : '',
  });

  const choiceList = [9, 10, 13];
  const reasonList = ['Tidak ada orang', 'Invalid Address', 'Ditolak Penerima', 'Alasan Lain'];

      useEffect(() => {
        getData();
      }, []);

      const getData = async () => {
        await SecureStore.getItemAsync('secured_token').then((token) => {
          axios({
            method: "get",
            url: HostUri+'delivery/pending',
            headers: {
              "Content-Type": 'application/json',
              "Authorization" : `Bearer ${token}`,
            },
          }).then(function (response) {
              // berhasil
              setLoading(false);
              setData(response.data.data);
            }).catch(function (error) {
              // masuk ke server tapi return error (unautorized dll)
              if (error.response) {
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
                alert('Check Koneksi anda !')
                console.error(error.request);
                setLoading(false);
              } else {
                // error yang ga di sangka2
                console.error("Error", error.message);
                setLoading(false);
              }
          });
        });
      }

      const onPressUpdate = (id_return, choice_return = '', name_return = '', check_return = '', reason_return = '') => {
        if(choice_return == 1){
          setReturnData({
            shipping_id : id_return,
            selected_choice : choice_return,
            name : name_return,
            check : check_return,
            reason : reason_return,
          });
          setStartCamera(true);
        }else{
          updateShipping(id_return, choice_return, name_return, check_return, reason_return);
        }
      }

    const returnImage = (uri) =>
    {
      setStartCamera(false);
      updateShipping(returnData.shipping_id, returnData.selected_choice, returnData.name, returnData.check, returnData.reason, uri.uri);
    }

    const updateShipping = async (shipping_id, selected_choice, name, check, reason, img='') =>{
      // choice
       //   {key:'1', value:'Pickup Sukses'},
       //   {key:'2', value:'Pickup Gagal'},
       // ALL REQUEST shipping_id, selected_tracking, alasan
       setLoadingHttp(true);
       let true_reason = (check == 4) ? reason : reasonList[check-1];
       let formData = new FormData();
       formData.append('shipping_id', shipping_id);
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
       await SecureStore.getItemAsync('secured_token').then((token) => {
         let optHeader = (img == '') ? { "Content-Type": 'application/json', "Authorization" : `Bearer ${token}`} : {"content-Type": 'multipart/form-data', "Authorization" : `Bearer ${token}`};
       axios({
         method: "post",
         url: HostUri+'delivery/update',
         headers: optHeader,
        //  data : {
        //    shipping_id: shipping_id,
        //    selected_tracking: choiceList[(selected_choice-1)],
        //    alasan : true_reason,
        //    img : { uri: img, name: filename, type:type }
        //  }
        data : formData
       }).then(function (response) {
           // berhasil
           setLoadingHttp(false);
           setLoading(true);
           getData();
           setLoading(false);
         }).catch(function (error) {
           // masuk ke server tapi return error (unautorized dll)
           setLoadingHttp(false);
           if (error.response) {
             //gagal login
             if(error.response.data.message == 'Unauthenticated.' || error.response.data.message == 'Unauthorized')
             {
               SecureStore.deleteItemAsync('secured_token');
               SecureStore.deleteItemAsync('secured_name');
               router.replace('/');
             }
            //  console.error(error.response.data);
            //  console.error(error.response.status);
            //  console.error(error.response.headers);
           } else if (error.request) {
             // ga konek ke server
             setLoadingHttp(false);
             alert('Check Koneksi anda !')
             console.error(error.request);
           } else {
             // error yang ga di sangka2
             setLoadingHttp(false);
             console.error("Error", error.message);
           }
       });
   });
     }

      
    return(
      <SafeAreaView style={styles.container}>

        <View style={styles.headerContainer}>
          <Header title='Paket Pending'/>
        </View>

        <View style={styles.headerChild}>
        <Text style={styles.tanggal}>{ new Date().toLocaleDateString('id-ID', {weekday: 'long',  month: 'long', day:'2-digit', year :'numeric' }) }</Text>
        <View style={styles.dropdownContainer}>
        <Text style={styles.totalText}>Total : {Object.keys(data).length} AWB</Text>
        </View>
      </View>

        <Divider
          style={{margin: 5 }}
          color="red"
          width={2}
          orientation="horizontal"
        />

        <View style={styles.listContainer}>
        {
          startCamera &&
          <CanvasCamera startCamera={startCamera} returnImage = {returnImage}/>
        }
        {!startCamera && 
          (
        <ScrollView >
          {
            data.length == 0 && !loading &&
            <Text>No Data Found</Text>
          }
          {
            loadingHttp && 
            <Dialog isVisible={loadingHttp} overlayStyle={{backgroundColor:'rgba(52, 52, 52, 0.5)' }}>
              <Dialog.Loading />
            </Dialog>
          }

          {
            loading &&
            <View style={{ flex:1, flexDirection:'column', padding:10 }}>
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
            { !loading &&
              data.map((l, i) => (
                <AccordionPending data={ l } key={l.shipping_awb} onPressUpdate ={onPressUpdate} reasonList ={reasonList}/>
                // <ListItem key={i} bottomDivider Component={View}>
                //   <ListItem.Content>
                //     <ListItem.Subtitle><Text style={styles.tableHead}>AWB</Text></ListItem.Subtitle>
                //     <ListItem.Title><Text style={{ fontWeight:'bold' }}>{l.shipping_awb}</Text></ListItem.Title>
                //     <ListItem.Subtitle><Text style={styles.tableHead}>Alasan</Text></ListItem.Subtitle>
                //     <ListItem.Title>{l.reason}</ListItem.Title>
                //   </ListItem.Content>
                //   <ListItem.Content right>
                //     <ListItem.Subtitle><Text style={styles.tableHead}>Status</Text></ListItem.Subtitle>
                //     <ListItem.Title><Text style={{ color:'red' }}>{l.shipping_status}</Text></ListItem.Title>
                //     <ListItem.Subtitle ><TouchableOpacity><Text style={{ color:'blue' }}>Update</Text></TouchableOpacity></ListItem.Subtitle>
                //   </ListItem.Content>
                // </ListItem>
              ))
            }
          </ScrollView>
          )
        }
            </View>
        <Footer  />
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
    height:'8%'
  },
  headerChild : {
    flex: 1,
    flexDirection : 'row'
  },
  tanggal : {
    flex : 2,
    color:'grey',
    margin: 10
  },
  dropdownContainer : {
    flex:1
  },
  datepickContainer : { 
    height:'8%',
    flexDirection : 'row', 
    alignItems: "center", 
    justifyContent: "space-evenly" 
  },
  totalContainer : {
    flex:1,
    margin:10
  },
  totalText : {
    fontSize:16, 
    fontWeight:'bold'
  },
  listContainer : {
    height:'74%',
    padding : 10
  },
  tableHead :{
    fontSize:12,
    color : 'grey'
  }
});
