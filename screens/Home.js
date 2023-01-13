//import * as React from 'react';
import { Button, View, Text } from 'react-native';
import React, { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { SelectList } from 'react-native-dropdown-select-list';

const Home = ({ route, navigation }) => {

  const {Item} = route.params;

  const [data] = React.useState([]);
  
  const [selected, setSelected] = React.useState("");
  
  const [horaInicio, setHoraInicio] = React.useState([]);
  const [horaFim, setHoraFim] = React.useState([]);

  function getHoraInicio(documentSnapshot){return documentSnapshot.get('horaInicio');}
  function getHoraFim(documentSnapshot){return documentSnapshot.get('horaFim');}

  //TENTAR MOSTRAR AS HORAS DO HORARIO SELECIONADO
  const lol = () => {
    firestore()
    .doc(`testeid/${Item}`)
    .collection('turnos')
    .doc(`${selected}`)
    .get()
    .then(documentSnapshot => getHoraInicio(documentSnapshot))
    .then(horaInicio => {
      const horinha = []
      horinha.push(horaInicio)
      setHoraInicio(horinha)
    })
  };

  //TENTAR MOSTRAR AS HORAS DO HORARIO SELECIONADO
  const lolo = () => {
    firestore()
    .doc(`testeid/${Item}`)
    .collection('turnos')
    .doc(`${selected}`)
    .get()
    .then(documentSnapshot => getHoraFim(documentSnapshot))
    .then(horaFim => {
      const horinha = []
      console.log(horaFim);
      horinha.push(horaFim)
      setHoraFim(horinha)
    });
  };

  useEffect(() => {
    firestore()
    .doc(`testeid/${Item}`)
    .collection('turnos')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push(doc.id)
        console.log(doc.id)
      });
    });
  }, []);

  const logout = () => {
    auth()
    .signOut()
    .then(navigation.replace("Login"))
  };

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
      onSelect={async () => {
        Promise.all([lol(), lolo()]);
      }}
      />

      <Text>Dia Escolhido: {selected}</Text>
      <Text>Inicio do Turno: {horaInicio}</Text>
      <Text>Fim do Turno: {horaFim}</Text>

      <Button
      title="Terminar Sessão"
      onPress={logout}
      />

    </View>
  );
};

export default Home;