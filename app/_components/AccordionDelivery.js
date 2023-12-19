import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem, Dialog, CheckBox, Input } from '@rneui/themed';
import {SelectList} from 'react-native-dropdown-select-list';

const AccordionDelivery = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [checked, setChecked] = useState(1);
    const [selected, setSelected] = useState(1);
    const [name, setName] = useState('');
    const [reason, setReason] = useState('');
    const onPressUpdate = props.onPressUpdate;
    const reasonList = props.reasonList;
    const choice = [
      {key:'1', value:'Delivery Sukses'},
      {key:'2', value:'Delivery Gagal'},
    ];

   
    let data = props.data;

    const toggleModal = () => {
      setShowModal(!showModal);
      setChecked(1);
      setSelected(1);
    };

    const updateHandler= (awb) => {
      toggleModal();
      onPressUpdate(awb, selected, name, checked, reason);
    }

    return(
      <View>
        <ListItem.Accordion
        content={
          <ListItem.Content>
            <ListItem.Title><Text style={{ color:'white' }}>{data.transaction_address_name}</Text></ListItem.Title>
            <ListItem.Subtitle><Text style={{ color:'white' }}>{data.shipping_awb}</Text></ListItem.Subtitle>
          </ListItem.Content>
        }
        isExpanded={expanded}
        onPress={() => {
            setExpanded(!expanded);
        }}
        key={data.id}
        containerStyle={styles.host}
      >
        <ListItem key={data.id} containerStyle={styles.guest}>
          <ListItem.Content>
            <View style={{ flexDirection:'row' }}>
                <View style={{ flex:1 }}>
                    <Text>{data.transaction_address_detail}</Text>
                    {data.kelurahan && <Text>Kel. {data.kelurahan}{data.city_name && <Text> Kota. {data.city_name}</Text>}</Text>}
                    {data.province_name && <Text>Prov. {data.province_name} {data.zipcode && <Text>{data.zipcode} </Text>}</Text>}
                    {data.telp && <Text>Telp. {data.telp}</Text>}
                    {data.shipping_product_weight && <Text>Berat {data.shipping_product_weight} gram</Text>}
                    {data.service && <Text>Service {data.service}</Text>}
                </View>
                <View><TouchableOpacity><Text onPress={toggleModal} style={{ color:'blue',  fontWeight:'bold' }}>Update</Text></TouchableOpacity></View>
            </View>
            <View style={styles.buttongroup}>
                <TouchableOpacity style={styles.button}><Text style={{ color:'white', textAlign : 'center' }}>WA Call</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button}><Text style={{ color:'white', textAlign : 'center' }}>WA Chat</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button}><Text style={{ color:'white', textAlign : 'center' }}>Navigasi</Text></TouchableOpacity>
            </View>
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>

      <Dialog isVisible={showModal} onBackdropPress={toggleModal}>

          <Dialog.Title title=""/>
          <SelectList 
                setSelected={(val) => {setSelected(val); setChecked(1)}} 
                data={choice} 
                save="key"
                placeholder='Delivery Sukses'
                dropdownStyles={{ zIndex:999, minHeight:100, backgroundColor : 'white' }}
                boxStyles={{ margin:10, borderColor:'red' }}
            />
            {
              selected == 1
              && 
              <View style={{ padding:10 }}>
                <Text>Diterima Oleh :</Text>
                <Input onChangeText={setName}/>
                <TouchableOpacity onPress={()=>{ updateHandler(data.shipping_awb)}}>
                <View style={{ borderColor:'white', backgroundColor:'red', borderWidth:2, borderRadius : 10, padding:10, alignItems:'center'}}>
                  <Text style={{ color:"white", fontWeight:'bold' }}>Update dan Ambil Foto</Text>
                </View>
              </TouchableOpacity>
              </View>              
            }

            { 
              selected == 2 
              && 
              <View>
                {
                reasonList.map((l, i) => (
                  <CheckBox
                    key={i}
                    title={l}
                    containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={checked === i + 1}
                    onPress={() => setChecked(i + 1)}
                    checkedColor='red'
                  />
                ))
                }
                {
                  checked == 5
                  &&
                  <Input onChangeText={setReason} />
                }
                <Dialog.Actions>
                <Dialog.Button
                  title="UPDATE"
                  onPress={() => {
                    updateHandler(data.shipping_awb);
                  }}
                  titleStyle={{ color:'red' }}
                />
                <Dialog.Button title="CANCEL" onPress={toggleModal} titleStyle={{ color:'red' }}/>
              </Dialog.Actions>
              </View>
            }         
          </Dialog>
        </View>
    );
}

const styles = StyleSheet.create({
    host : {
        backgroundColor : '#ff0000',
        marginBottom : 5,
    },
    guest : {
        backgroundColor : '#F3EEEA',
        padding: 10,
    },
    button : {
        flex : 1,
        borderColor : 'white',
        borderWidth : 2,
        borderRadius : 10,
        padding : 10,
        backgroundColor : '#ff0000',
        margin : 5
    },
    buttongroup : {
        flexDirection : 'row',
        margin : 10,
    }
});
    
export default AccordionDelivery;