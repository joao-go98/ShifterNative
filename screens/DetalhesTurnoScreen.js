//import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import React, { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { SelectList } from 'react-native-dropdown-select-list';

const DetalhesTurnoScreen = ({ route, navigation }) => {

  const {Items} = route.params;

  const [data] = React.useState([]);

  
  function getHoraInicio(documentSnapshot){return documentSnapshot.get('horaFim');}

  const [horaInicio] = React.useState([]);
  const [horaFim] = React.useState([]);

  let fruits = [];

  useEffect(() => {
    firestore()
    .doc(`testeid/Bernardo`)
    .collection('turnos')
    .doc("19-04-2023")
    .get()
    //OLHAR PARA O LOGIN
    .then(documentSnapshot => getHoraInicio(documentSnapshot))
    .then(zipCode => {
      console.log(fruits.push(zipCode));  // Output: 3
      console.log(fruits);  // Output: ['apple', 'banana', 'orange']
    })
    .catch(error => {
      alert("Erro");
    });

  }, []);

  const teste = () => {
    firestore()
    .doc(`testeid/Bernardo`)
    .collection('turnos')
    .doc("19-04-2023")
    .update({
      horaFim: fruits[0],
      horaInicio: "02:21",
    })
    .then(() => {
      fruits.push("teste")
      console.log(fruits);
      return fruits
        // Output: ['apple', 'banana', 'orange']
    })
    .catch(error => {
      alert("Erro");
    });
  };

  let a = teste

  const logout = () => {
    auth()
    .signOut()
    .then(navigation.replace("Login"))
  };

  const testan = () => {
    console.log(a)
  };

  const [selected, setSelected] = React.useState("");

  return (
    <View>
      <Text>Bem Vindo {auth().currentUser?.email}</Text>

      <Text>RECEBER NOTIFS AQUI</Text>

      <SelectList 
      setSelected={(val) => setSelected(val)} 
      data={data} 
      save= "key"
      search={false}
      boxStyles={{borderRadius:0}}
      dropdownStyles={{borderRadius:0}}
      placeholder={"Escolhe o Dia"}
      />

      <Text>Dia Escolhido: {Items}</Text>
      <Text>Inicio do Turno: {fruits}</Text>
      <Text>Fim do Turno: {horaFim}</Text>

      <Button
        title="Terminar Sessão"
        onPress={logout}
      />

      <Button
        title="Obter Turnos"
        onPress={teste}
      />

      <Button
        title="Obter"
        onPress={testan}
      />

    </View>
  );
};

export default DetalhesTurnoScreen;