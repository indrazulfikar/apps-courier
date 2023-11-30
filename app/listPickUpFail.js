import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, ScrollView} from 'react-native';
import { ListItem } from '@rneui/themed';
import { router, Link } from "expo-router";
import Header from './_components/Header';
import Footer from './_components/Footer';
import CustomDatePick from './_components/CustomDatePick';

export default function listPickUpFail() {
    const dummy = [
        {
          awb: 'KD0923000000001',
          reason: 'Dangerous Goods',
          status: 'Gagal',
        },
        {
            awb: 'KD0923000000001',
            reason: 'Paket Belum Siap',
            status: 'Gagal',
          },
          {
            awb: 'KD0923000000001',
            reason: 'Ketinggalan',
            status: 'Update',
          },
      ]
    return(
        <SafeAreaView style={styles.container}>
        <Header title='List Pickup Gagal'/>
        <View style={styles.bawahHeader}>
            <Text style={styles.tanggal}>{ new Date().toLocaleDateString('id-ID', {weekday: 'long',  month: 'long', day:'2-digit', year :'numeric' }) }</Text>
        </View>
          <View style={{ flexDirection : 'row', alignItems: "center", justifyContent: "center" }}>
            <View style={{ margin:10 }}>
              <CustomDatePick />
            </View>
            <View>
              <CustomDatePick />
            </View>
          </View>
            <View><Text style={{ fontSize:16, fontWeight:'bold', padding:5 }}>Total 32 AWB</Text></View>
            <View>
            {
                dummy.map((l, i) => (
                  <ListItem key={i} bottomDivider Component={View}>
                    <ListItem.Content>
                      <ListItem.Subtitle><Text style={styles.tableHead}>AWB</Text></ListItem.Subtitle>
                      <ListItem.Title><Text style={{ fontWeight:'bold' }}>{l.awb}</Text></ListItem.Title>
                      <ListItem.Subtitle><Text style={styles.tableHead}>Alasan</Text></ListItem.Subtitle>
                      <ListItem.Title>{l.reason}<Text style={styles.tableHead}></Text></ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Content right>
                      <ListItem.Subtitle><Text style={styles.tableHead}>Status</Text></ListItem.Subtitle>
                      <ListItem.Title><Text style={{ color:'red' }}>{l.status}</Text></ListItem.Title>
                      <ListItem.Subtitle ><TouchableOpacity><Text style={{ color:'blue' }}>Update</Text></TouchableOpacity></ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                ))
              }
            </View>
            <View style={{ flex:3 }}></View>
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
      bawahHeader : {
        flex: 1,
        flexDirection : 'row'
      },
      tanggal : {
        flex : 1,
        color:'grey',
        margin: 10
      },
      tableHead :{
        fontSize:12,
        color : 'grey'
      }
});
