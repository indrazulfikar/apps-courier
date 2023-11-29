import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity} from 'react-native';
import { ListItem } from '@rneui/themed';
import { router, Link } from "expo-router";
import Header from './_components/Header';
import Footer from './_components/Footer';

export default function listPickup() {
    const dummy = [
        {
          name: 'Pasti_Laku',
          subtitle: 'Kel. Karang Tengah'
        },
        {
            name: 'Jaya_Abadi',
            subtitle: 'Kel. Karang Pinggir'
        },
        {
            name: 'Seller_ID',
            subtitle: 'Kel. Karang Mulya'
        },
        {
            name: 'Parfum_ON',
            subtitle: 'Kel. Karang Mangu'
        },
      ]

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex:1 }}>
                <Header title='List Pickup'/>
                <View style={styles.bawahHeader}>
                    <Text style={styles.tanggal}>{ new Date().toLocaleDateString('id-ID', {weekday: 'long',  month: 'long', day:'2-digit', year :'numeric' }) }</Text>
                    <Text >Dropdown</Text>
                </View>
            </View>
            <View style={{ margin:10 }}><Text style={{ fontSize:16, fontWeight:'bold' }}>Total : 25 Seller</Text></View>
            <View>
            {
                dummy.map((l, i) => (
                  <ListItem key={i} bottomDivider Component={TouchableOpacity}>
                    <ListItem.Content>
                      <ListItem.Title>{l.name}</ListItem.Title>
                      <ListItem.Subtitle right={true}>{l.subtitle}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Content right>
                      <ListItem.Subtitle ><Link href="/detailListPickup" asChild><Text>detail</Text></Link></ListItem.Subtitle>
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
      }
});