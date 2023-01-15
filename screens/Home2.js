//import * as React from 'react';
import React, { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { SelectList } from 'react-native-dropdown-select-list';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {Layout, Text, Button, Divider} from '@ui-kitten/components';

const Home2 = ({ route, navigation }) => {

  const {Item} = route.params;

  const [data] = React.useState([]);
  
  const [selected, setSelected] = React.useState("");
  
  const [horaInicio, setHoraInicio] = React.useState([]);
  const [horaFim, setHoraFim] = React.useState([]);

  function getHoraInicio(documentSnapshot){return documentSnapshot.get('horaInicio');}
  function getHoraFim(documentSnapshot){return documentSnapshot.get('horaFim');}
  
  function getTurnoFeito(documentSnapshot){return documentSnapshot.get('feito');}

  const [disableButton, setDisableButton] = React.useState(false);

  //TENTAR MOSTRAR AS HORAS DO HORARIO SELECIONADO
  const turnoler = () => {
    firestore()
    .doc(`testeid/${Item}`)
    .collection('turnos')
    .doc(`${selected}`)
    .get()
    .then(documentSnapshot => getTurnoFeito(documentSnapshot))
    .then(feito => {
    if(feito) 
    {setDisableButton(true)}
    else 
    {setDisableButton(false)}
    })
  };

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
      //setDisableButton(true)
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
    .then(navigation.replace("Login", {Splash: true}))
  };

  const visto = () => {
    firestore()
    .doc(`testeid/${Item}`)
    .collection('turnos')
    .doc(`${selected}`)
    .update({
      feito: true
    })
    .then(() => {
      setDisableButton(true)
      console.log("Deu")
    })
  };
    
  return (

    <Layout style={styles.row}>

    <View style={styles.alternativeContainer}>
    <Text style={styles.text} appearance='alternative'>
    Bem Vindo, {Item}
    </Text>
    </View>
    
    <SelectList 
    setSelected={(val) => setSelected(val)}
    data={data} 
    save="key"
    search={false}
    boxStyles={{borderRadius:0}}
    dropdownStyles={{borderRadius:0}}
    placeholder={"Escolhe o Dia"}
    onSelect={async () => {
    Promise.all([turnoler(), lol(), lolo()]);
    }}/>

    <Divider/>
    <Divider/>
    <Divider/>

    <Text>Dia Escolhido: {selected}</Text>
    <Text>Inicio do Turno: {horaInicio}</Text>
    <Text>Fim do Turno: {horaFim}</Text>

    <Divider/>
    <Divider/>
    <Divider/>

    <Button disabled={disableButton} onPress={visto}>{disableButton ? "Turno Realizado" : "Marcar Turno Como Realizado"}</Button>

    <Divider/>
    <Divider/>
    <Divider/>

    <Button onPress={logout}>
    Terminar Sessão
    </Button>

      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>

    <TouchableOpacity
    activeOpacity={0.7}
    style={styles.TouchableOpacityStyle}
    onPress={() => {alert('App Criada Por: João Gonçalves')}}>
    <Text style={styles.FloatingButtonInsideText}>?</Text>
    </TouchableOpacity>
    
    </Layout>
      
  );
};

const styles = StyleSheet.create({
    row: {
      paddingHorizontal: 10,
      marginVertical: 5,
      borderRadius: 5,
      width: '100%',
      paddingTop: '50%',
    },
    text: {
      margin: 2,
      fontWeight: 'bold'
    },
    alternativeContainer: {
      marginVertical: 2,
      backgroundColor: '#3366FF',
    },
    TouchableOpacityStyle: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 30,
      backgroundColor: '#2b79b0',
      borderRadius:50
    },
    FloatingButtonInsideText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18
    }
  });

export default Home2;