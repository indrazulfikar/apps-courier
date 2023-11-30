import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, ScrollView} from 'react-native';
import Header from './_components/Header';
import Footer from './_components/Footer';
import { useState } from 'react';
import CustomAccordion from './_components/CustomAccordion';

export default function detailListPickup() {
    const [expanded, setExpanded] = useState({});
    const dummy = [
        {
          name: 'Pasti_Laku',
          id: 'KD0923000000001',
          address: 'Jl. Malabar IV No. 3 Komplek Keuangan Karang Tengah Ciledug Tangerang 15157',
          phone: '081315977082',
          weight: '1200',
        },
        {
            name: 'Pasti_Laku',
            id: 'KD0923000000002',
            address: 'Jl. Malabar IV No. 3 Komplek Keuangan Karang Tengah Ciledug Tangerang 15157',
            phone: '081315977082',
            weight: '1200',
        },
        {
            name: 'Pasti_Laku',
            id: 'KD0923000000003',
            address: 'Jl. Malabar IV No. 3 Komplek Keuangan Karang Tengah Ciledug Tangerang 15157',
            phone: '081315977082',
            weight: '1200',
        },
        
      ]

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex:1 }}>
                <Header title='List Pickup'/>
                <View style={styles.bawahHeader}>
                    <Text style={styles.tanggal}>{ new Date().toLocaleDateString('id-ID', {weekday: 'long',  month: 'long', day:'2-digit', year :'numeric' }) }</Text>
                    <Text style={{ fontSize:14, fontWeight:'bold', padding:5 }}>Total 74 AWB</Text>
                </View>
            </View>
            <View>
            {
              dummy.map((l, i) => (
                  <CustomAccordion data={ l } />
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
      }
});