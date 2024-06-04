import { StyleSheet, Text, SafeAreaView, View, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import Header from '../_components/Header';
import Footer from '../_components/Footer';
import { useState, useEffect } from 'react';
import AccordionPickUp from '../_components/AccordionPickUp';
import { Divider, Skeleton, Dialog } from '@rneui/themed';
import { useLocalSearchParams, router } from 'expo-router';
import { HostUri } from '../_components/HostUri';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import CustomDatePick from '../_components/CustomDatePick';

export default function detailListPickup() {
    const { id } = useLocalSearchParams();
    const [bigdata, setBigData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingHttp, setLoadingHttp] = useState(false);
    const [err, setErr] = useState('')

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loadingmore, setLoadingmore]= useState(false);
    
    useEffect(() => {
        getData();
    }, []);

    const getMore = () => {
      if(currentPage < lastPage){
        setLoadingmore(true);
        setCurrentPage(currentPage+1);
        getData()
      }
    }

    const getData = async () => {
    await SecureStore.getItemAsync('secured_token').then((token) => {
      axios({
        method: "get",
        url: HostUri+`pickup/seller/${id}?page=`+currentPage,
        headers: {
          "Content-Type": 'application/json',
          "Authorization" : `Bearer ${token}`,
        },
      }).then(function (response) {
           // berhasil
           setLoading(false);
           setLoadingmore(false);
           // setData(response.data.data.data);
           // console.log(response.data.data.data)
           if(currentPage == 1){
             setBigData(response.data.data.data)
           }else{
             setBigData([...bigdata, ...response.data.data.data]);
           }
           setLastPage(response.data.data.last_page);
           setTotal(response.data.data.total)
        }).catch(function (error) {
          // masuk ke server tapi return error (unautorized dll)
          if (error.response) {
           setLoadingmore(false);
           //gagal login
            setLoading(false);
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
           setLoadingmore(false);
           setLoading(false);
            alert('Check Koneksi anda !')
            console.error(error.request);
          } else {
           setLoadingmore(false);
           setLoading(false);
            // error yang ga di sangka2
            console.error("Error", error.message);
          }
      });
    });
    }
    const onPressUpdate = async (shipping_id, selected_choice = null, reason = '') =>{
        // choice
        //   {key:'1', value:'Pickup Sukses'},
        //   {key:'2', value:'Pickup Gagal'},
        let choice = [4, 3];
        // ALL REQUEST shipping_id, selected_tracking, alasan
        setLoadingHttp(true);
        
        await SecureStore.getItemAsync('secured_token').then((token) => {
        axios({
          method: "post",
          url: HostUri+'pickup/update',
          headers: {
            "Content-Type": 'application/json',
            "Authorization" : `Bearer ${token}`,
          },
          data : {
            shipping_id: shipping_id,
            selected_tracking: choice[(selected_choice-1)],
            alasan : reason
        }
        }).then(function (response) {
            // berhasil
            // router.back();
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
              // console.error(error.response.data);
              // console.error(error.response.status);
              // console.error(error.response.headers);
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

    return (
        <SafeAreaView style={styles.container}>

          <View style={styles.headerContainer}>
            <Header/>
          </View>

          <View style={styles.datepickContainer}>
            <View >
              <CustomDatePick />
            </View>
            <View>
              <CustomDatePick />
            </View>
          </View>

            <View style={styles.listContainer}>
            <FlatList               
            data={bigdata}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>  <AccordionPickUp data={ item } onPressUpdate ={onPressUpdate} />}
            initialNumToRender={15}   // how many item to display first
            onEndReachedThreshold={0.5} // so when you are at 5 pixel from the bottom react run onEndReached function
            ListHeaderComponent ={
              <View>
              <Text>Pickup Seller</Text>
              <Divider
                  style={{margin: 5 }}
                  color="red"
                  width={2}
                  orientation="horizontal"
                />
              </View>
              }
              stickyHeaderIndices={[0]}
              onEndReached={() => {
                getMore();
              }}
              ListFooterComponent={
                <View>
                {
                loadingmore &&
                [{}].map((l, i) => (
                  <Skeleton
                  // LinearGradientComponent={LinearGradient}
                  animation="pulse"
                  width={'100%'}
                  height={60}
                  style={{ marginBottom:5 }}
                  key={i}
                />
                  ))} 
                {
                  bigdata.length == 0 && !loading &&
                  <View style={{ backgroundColor:'white' }}>
                      <Text>No Data Found</Text>
                  </View>
                }
                {
                  loading &&
                  <View style={{ flex:1, flexDirection:'column' }}>
                    {
                      [{},{},{},{},{},{}].map((l, i) => (
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
                  loadingHttp && 
                  <Dialog isVisible={loadingHttp} overlayStyle={{backgroundColor:'rgba(52, 52, 52, 0.5)' }}>
                    <ActivityIndicator />
                  </Dialog>
                }
                </View>
              }
          />
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
    height:'10%'
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
    flex:1,
    margin : 10,
    textAlign:'right',
    fontSize:16,
    fontWeight:'bold'
  },
  listContainer : {
    // height:'70%',
    flex:12,
    paddingHorizontal:10
  },
  datepickContainer : { 
    height:'10%',
    flexDirection : 'row', 
    alignItems: "center", 
    justifyContent: "space-evenly" 
  },
});