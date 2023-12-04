import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, ScrollView} from 'react-native';
import { ListItem, Divider } from '@rneui/themed';
import { router, Link } from "expo-router";
import Header from './_components/Header';
import Footer from './_components/Footer';
import CustomDatePick from './_components/CustomDatePick';

export default function listDeliverySuccess() {
    const dummy = [
        {
          awb: 'KD0923000000001',
          weight: '1200',
          status: 'Req Pickup',
        },
        {
            awb: 'KD0923000000002',
            weight: '800',
            status: 'Req Pickup',
        },
        {
            awb: 'KD0923000000003',
            weight: '500',
            status: 'Req Pickup',
        },
        {
          awb: 'KD0923000000004',
          weight: '1500',
          status: 'Req Pickup',
        },
        {
          awb: 'KD0923000000005',
          weight: '1500',
          status: 'Req Pickup',
        },
        {
          awb: 'KD0923000000006',
          weight: '1500',
          status: 'Req Pickup',
        },
        {
          awb: 'KD0923000000007',
          weight: '1500',
          status: 'Req Pickup',
        },
        {
          awb: 'KD0923000000008',
          weight: '1500',
          status: 'Req Pickup',
        },
        {
          awb: 'KD0923000000009',
          weight: '1500',
          status: 'Req Pickup',
        },
        {
          awb: 'KD0923000000010',
          weight: '1500',
          status: 'Req Pickup',
        },
      ]
    return(
        <SafeAreaView style={styles.container}>

          <View style={styles.headerContainer}>
            <Header title='List Delivery Sukses'/>
          </View>

          <View style={styles.headerChild}>
            <Text style={styles.tanggal}>{ new Date().toLocaleDateString('id-ID', {weekday: 'long',  month: 'long', day:'2-digit', year :'numeric' }) }</Text>
            <View style={styles.dropdownContainer}>
            </View>
          </View>

          <View style={styles.datepickContainer}>
            <View style={{ margin:10 }}>
              <CustomDatePick />
            </View>
            <View>
              <CustomDatePick />
            </View>
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total 32 AWB</Text>
          </View>

          <Divider
            style={{margin: 5 }}
            color="red"
            width={2}
            orientation="horizontal"
          />

          <View style={styles.listContainer}>
            <ScrollView>
              {
                dummy.map((l, i) => (
                  <ListItem key={i} bottomDivider Component={View}>
                    <ListItem.Content>
                      <ListItem.Subtitle><Text style={styles.tableHead}>AWB</Text></ListItem.Subtitle>
                      <ListItem.Title><Text style={{ fontWeight:'bold' }}>{l.awb}</Text></ListItem.Title>
                      <ListItem.Subtitle><Text style={styles.tableHead}>Berat</Text></ListItem.Subtitle>
                      <ListItem.Title>{l.weight}<Text style={styles.tableHead}> Gram</Text></ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Content right>
                      <ListItem.Subtitle><Text style={styles.tableHead}>Status</Text></ListItem.Subtitle>
                      <ListItem.Title><Text style={{ color:'red' }}>{l.status}</Text></ListItem.Title>
                      <ListItem.Subtitle ><TouchableOpacity><Text style={{ color:'blue' }}>Update</Text></TouchableOpacity></ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                ))
              }
            </ScrollView>
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
    flex:2,
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
    flex:2,
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
    flex : 13,
  },
  tableHead :{
    fontSize:12,
    color : 'grey'
  }
});
