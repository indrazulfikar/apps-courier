import { StyleSheet, Text, SafeAreaView, View, ScrollView} from 'react-native';
import Header from './_components/Header';
import Footer from './_components/Footer';
import { useState } from 'react';
import AccordionDelivery from './_components/AccordionDelivery';
import { Divider } from '@rneui/themed';

export default function listDeliveryDetail() {
    const [expanded, setExpanded] = useState({});
    const dummy = [
        {
            name: 'Pasti_Laku',
            id: 'KD0923000000001',
            address: 'Jl. Malabar IV No. 3 Komplek Keuangan Karang Tengah Ciledug Tangerang 15157',
            phone: '081315977082',
            weight: '1200',
            service : 'reguler'

        },
        {
            name: 'Pasti_Laku',
            id: 'KD0923000000002',
            address: 'Jl. Malabar IV No. 3 Komplek Keuangan Karang Tengah Ciledug Tangerang 15157',
            phone: '081315977082',
            weight: '1200',
            service : 'reguler'
        },
        {
            name: 'Pasti_Laku',
            id: 'KD0923000000003',
            address: 'Jl. Malabar IV No. 3 Komplek Keuangan Karang Tengah Ciledug Tangerang 15157',
            phone: '081315977082',
            weight: '1200',
            service : 'reguler'
        },
        {
          name: 'Pasti_Laku',
          id: 'KD0923000000004',
          address: 'Jl. Malabar IV No. 4 Komplek Keuangan Karang Tengah Ciledug Tangerang 15157',
          phone: '081315977082',
          weight: '1200',
          service : 'reguler'
        },
        {
          name: 'Pasti_Laku',
          id: 'KD0923000000005',
          address: 'Jl. Malabar IV No. 4 Komplek Keuangan Karang Tengah Ciledug Tangerang 15157',
          phone: '081315977082',
          weight: '1200',
          service : 'reguler'
        },
        {
          name: 'Pasti_Laku',
          id: 'KD0923000000006',
          address: 'Jl. Malabar IV No. 4 Komplek Keuangan Karang Tengah Ciledug Tangerang 15157',
          phone: '081315977082',
          weight: '1200',
          service : 'reguler'
        },
        {
          name: 'Pasti_Laku',
          id: 'KD0923000000007',
          address: 'Jl. Malabar IV No. 4 Komplek Keuangan Karang Tengah Ciledug Tangerang 15157',
          phone: '081315977082',
          weight: '1200',
          service : 'reguler'
        },
        {
          name: 'Pasti_Laku',
          id: 'KD0923000000008',
          address: 'Jl. Malabar IV No. 4 Komplek Keuangan Karang Tengah Ciledug Tangerang 15157',
          phone: '081315977082',
          weight: '1200',
        },
        {
          name: 'Pasti_Laku',
          id: 'KD0923000000009',
          address: 'Jl. Malabar IV No. 4 Komplek Keuangan Karang Tengah Ciledug Tangerang 15157',
          phone: '081315977082',
          weight: '1200',
          service : 'reguler'
        },
        {
          name: 'Pasti_Laku',
          id: 'KD0923000000010',
          address: 'Jl. Malabar IV No. 4 Komplek Keuangan Karang Tengah Ciledug Tangerang 15157',
          phone: '081315977082',
          weight: '1200',
          service : 'reguler'
        },
        
      ]

    return (
        <SafeAreaView style={styles.container}>

          <View style={styles.headerContainer}>
            <Header title='List Delivery'/>
          </View>

          <View style={styles.headerChild}>
            <Text style={styles.tanggal}>{ new Date().toLocaleDateString('id-ID', {weekday: 'long',  month: 'long', day:'2-digit', year :'numeric' }) }</Text>
            <Text style={styles.dropdownContainer}>Total 74 AWB</Text>
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
                    <AccordionDelivery data={ l } />
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
    flex:1,
    margin : 10,
    textAlign:'right',
    fontSize:16,
    fontWeight:'bold'
  },
  listContainer : {
    flex : 13,
    paddingLeft:10,
    paddingRight:10,
  }
});