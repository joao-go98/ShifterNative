import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import {Layout, Text, Button, Divider} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import { SelectList } from 'react-native-dropdown-select-list';

function TurnoScreen({ route, navigation }) {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePress = () => {
    setIsPickerVisible(true);
  };

  const handleDateChange = (event, date) => {
    setIsPickerVisible(false);
    setSelectedDate(date);
  };

  const [isPickerVisible2, setIsPickerVisible2] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handlePress2 = () => {
    setIsPickerVisible2(true);
  };

  const handleTimeChange = (event, date) => {
    setIsPickerVisible2(false);
    setSelectedTime(date);
  };

  const [isPickerVisible3, setIsPickerVisible3] = useState(false);
  const [selectedTime3, setSelectedTime3] = useState(new Date());

  const handlePress3 = () => {
    setIsPickerVisible3(true);
  };

  const handleTimeChange3 = (event, date) => {
    setIsPickerVisible3(false);
    setSelectedTime3(date);
  };

  const dateString = selectedDate.toLocaleString();
  const timeString = selectedTime.toTimeString();

  const indexvirgula = dateString.indexOf(",");

  let dataDia = dateString.substring(0, indexvirgula);

  //Pronto para mandar para o firebase
  let fireDia = dataDia.split('/').join('-');

  //tempo 
  const indexdp = timeString.split(":");

  const horaDia = indexdp.slice(0, 2).join(":");
  
  //Fazer o mesmo para o final do dia
  const timeString2 = selectedTime3.toTimeString();
  
  const indexdp2 = timeString2.split(":");

  const horaDia2 = indexdp2.slice(0, 2).join(":");

  const [data] = React.useState([]);

  useEffect(() => {
    // Get a reference to the desired collection
    const collectionRef = firestore().collection('testeid');
    // Get all documents in the collection
    collectionRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      data.push(doc.id);
    });
    });
  }, []);

  const [selected, setSelected] = React.useState("");

  //VARS para nao mexer
  const {Item} = route.params;

  const testedoc = () => {
    firestore()
    .doc(`testeid/${selected}`)
    .collection('turnos')
    .doc(fireDia)
    .set({
      feito: false,
      horaInicio: horaDia,
      horaFim: horaDia2
    })
    .then(() => {
      alert("Turno Criado!");
    });
  };

  return (
    <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'black' }}>Criador de Turnos</Text>

      <SelectList 
      placeholder='Escolhe o Utilizador'
      setSelected={(val) => setSelected(val)} 
      data={data} 
      save= "key"
      search={false}
      boxStyles={{borderRadius:0}}
      dropdownStyles={{borderRadius:0}}
      />

      <Divider/>
      <Divider/>
      <Divider/>
      <Divider/>

      <Button onPress={handlePress}>{dataDia}</Button>
      {isPickerVisible && (
        <RNDateTimePicker
          value={selectedDate}
          minimumDate={new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Text></Text>
      <Button onPress={handlePress2}>{`Inicio do Turno: ${horaDia}`}</Button>
      {isPickerVisible2 && (
        <RNDateTimePicker
          value={selectedTime}
          minuteInterval={10}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={handleTimeChange}
        />
      )}
      <Text></Text>
      <Button onPress={handlePress3}>{`Fim do Turno: ${horaDia2}`}</Button>
      {isPickerVisible3 && (
        <RNDateTimePicker
          value={selectedTime3}
          minuteInterval={10}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={handleTimeChange3}
        />
      )}
      <Text></Text>

      <Button onPress={testedoc}>Criar Turno</Button>

    </Layout>
    );   
}

export default TurnoScreen;