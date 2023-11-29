import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, ScrollView} from 'react-native';
import { ListItem } from '@rneui/themed';
import { router, Link } from "expo-router";
import Header from './_components/Header';
import Footer from './_components/Footer';

export default function listPickUpSuccess() {
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
      ]
    return(
        <SafeAreaView style={styles.container}>
        <Header title='List Pickup Sukses'/>
        <View style={styles.bawahHeader}>
            <Text style={styles.tanggal}>{ new Date().toLocaleDateString('id-ID', {weekday: 'long',  month: 'long', day:'2-digit', year :'numeric' }) }</Text>
        </View>
            <View><Text>Date Picker</Text></View>
            <View><Text style={{ fontSize:16, fontWeight:'bold', padding:5 }}>Total 32 AWB</Text></View>
            <View>
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
