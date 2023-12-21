import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { ListItem, Dialog, CheckBox } from '@rneui/themed';
import {SelectList} from 'react-native-dropdown-select-list';

const AccordionPickUpCorporate = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [checked, setChecked] = useState(1);
    const [selected, setSelected] = useState(1);
    const [reasonText, setReasonText] = useState('');
    const [loading, setLoading] = useState(false);
    const onPressUpdate = props.onPressUpdate;
    const choice = [
      // {key:'1', value:'Seller', disabled:true},
      {key:'1', value:'Pickup Sukses'},
      {key:'2', value:'Pickup Gagal'},
    ];
    const reason = ['Dangerous Goods', 'Invalid Address', 'Packing Rusak', 'Paket Belum Siap', 'Alasan Lain'];


    let data = props.data;

    const toggleModal = () => {
      setShowModal(!showModal);
    };

    const updateToSuccessHandler = async(shipping_id, selected_choice) => {
      let submitReason = '';
      if(selected_choice == 2){
        submitReason = (checked == 5) ? reasonText : reason[checked-1];
      }
      setLoading(true);
      await onPressUpdate(shipping_id, selected_choice, submitReason);
      setLoading(false);
      setShowModal(!showModal);
      resetChoice();
    }

    const resetChoice = () =>{
      setChecked(1);
      setSelected(1);
      setReasonText('');
    }

    return(
        <ListItem.Accordion
        content={
          <ListItem.Content>
            <ListItem.Title><Text style={{ color:'white' }}>{data.order_corporate_trx_id}{ data.shipping_cod != 'no' && (<Text> - COD</Text>)}</Text></ListItem.Title>
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
                    {data.shipping_product_weight && <Text>Berat : {data.shipping_product_weight} gram</Text>}
                    {data.shipping_status == 'pickedup' && <Text>Status : Pickup Success</Text>}
                    {data.shipping_status == 'miss route' && <Text>Status : {data.reason.shipping_history_desc}</Text>}
                 </View>
                {( data.shipping_status != 'pickedup' && data.shipping_status != 'miss route')  && (<View><TouchableOpacity><Text onPress={toggleModal} style={{ color:'blue',  fontWeight:'bold' }}>Update</Text></TouchableOpacity></View>)}
          <Dialog isVisible={loading} overlayStyle={{backgroundColor:'rgba(52, 52, 52, 0.5)' }}>
            <Dialog.Loading />
          </Dialog>
           <Dialog
              isVisible={showModal}
              // onBackdropPress={toggleModal}
            >
          <Dialog.Title title=""/>
          <SelectList 
                setSelected={(val) => {setSelected(val)}} 
                data={choice} 
                save="key"
                placeholder='Pickup Sukses'
                dropdownStyles={{ zIndex:999, minHeight:100, backgroundColor : 'white' }}
                boxStyles={{ margin:10, borderColor:'red' }}
            />
            { 
              selected == 1 
              && 
              <Dialog.Actions>
          <Dialog.Button
            title="UPDATE"
            onPress={() => {updateToSuccessHandler(data.shipping_id, selected);}}
            titleStyle={{ color:'red' }}
          />
          <Dialog.Button title="CANCEL" onPress={()=>{resetChoice();toggleModal();}} titleStyle={{ color:'red' }}/>
        </Dialog.Actions>
            }
            { 
              selected == 2 
              && 
              reason.map((l, i) => (
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
              <View style={styles.inputView}>
              <TextInput onChangeText={(val)=>setReasonText(val)} style={styles.input}/>
              </View>
            }
            { 
              selected == 2 
              && 
              <Dialog.Actions>
          <Dialog.Button
            title="UPDATE"
            // onPress={() => {
            //   console.log(`Option ${checked} was selected! and ${reasonText}`);
            //   toggleModal();
            // }}
            onPress={() => {updateToSuccessHandler(data.shipping_id, selected);}}
            titleStyle={{ color:'red' }}
          />
          <Dialog.Button title="CANCEL" onPress={()=>{resetChoice();toggleModal();}} titleStyle={{ color:'red' }}/>
        </Dialog.Actions>
            }
         
          </Dialog>
            </View>
            <View style={styles.buttongroup}>
                <TouchableOpacity style={styles.button}><Text style={{ color:'white', textAlign : 'center' }}>WA Call</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button}><Text style={{ color:'white', textAlign : 'center' }}>WA Chat</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button}><Text style={{ color:'white', textAlign : 'center' }}>Navigasi</Text></TouchableOpacity>
            </View>
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>
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
    },
    inputView: {
      backgroundColor: "white",
      borderRadius: 10,
      marginBottom: 20,
      borderWidth:1,
      borderColor:'red',
      height:50,
    },
    input : {
      height:50,
      textAlign:'left',
      paddingLeft:10
    }
});
    
export default AccordionPickUpCorporate;