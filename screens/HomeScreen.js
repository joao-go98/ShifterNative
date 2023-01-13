//import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({ navigation }) => {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const [inputUsername, setInputUsername] = useState('');
  const [inputText, setInputText] = useState('');
  const [inputPass, setInputPass] = useState('');

  const handlePress = () => {
    //Ver se User Existe
    firestore()
      .collection('testeid')
      .doc(inputUsername)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          alert("Username já Existe");
        }
        else{
          auth()
            .createUserWithEmailAndPassword(inputText, inputPass)
            .then(() => {
              console.log('Conta Criada');
              //Criar Registo no FireStore
              firestore()
              .collection('testeid')
              .doc(inputUsername)//username aqui
              .set({
                username: inputUsername,
                email: inputText,
                admin: false,
              })
              .then(() => {
                console.log('Acho q deu');
              });
            })
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                alert("Email já existe");
              }
              if (error.code === 'auth/invalid-email') {
                alert("Email Invalido por motivos de segurança");
              }
              //console.error(error);
            });
        }
      });

  };

  const pressionar = () => {
    auth()
      .signInWithEmailAndPassword(inputText, inputPass)
      .then(() => {
        console.log('User is logged in');
        //navigation.navigate('AdminScreen', {teste: "ola"});
      })
      .catch(error => {
        alert("Combinação Errada");
        //console.error(error);
      });
  };

  const signaOut = () => {
    auth()
    .signOut()
  };

  function getUserZipCode(documentSnapshot){return documentSnapshot.get('email');}
  
  const testeDoc = () => {
    firestore()
      .collection('testeid')
      .doc('Joao')
      .get()
      .then(documentSnapshot => getUserZipCode(documentSnapshot))
      .then(zipCode => {
        console.log('Criado em: ', zipCode.toDate().toString());
      });

    //MODIFICAR USERS
    /*
    firestore()
    .collection('testeid')
    .doc('Joao')
    .set({
      createdAt: firestore.Timestamp.now()
    })
    .then(() => {
      console.log('documento adicionado');
    });
    */

  };

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
        <View>
        
        <TextInput
          value={inputUsername}
          placeholder="Username"
          onChangeText={text => setInputUsername(text)}
        />

        <TextInput
          value={inputText}
          placeholder="Email"
          onChangeText={text => setInputText(text)}
        />

        <TextInput
          value={inputPass}
          placeholder="Password"
          onChangeText={text => setInputPass(text)}
        />

        <Button
        title="Login"
        onPress={pressionar}
        />

      </View>
    );

  }

  return (

    <View>
      
      <Text>Bem Vindo {user.email}</Text>

      <Button
        title="Terminar Sessão"
        onPress={signaOut}
      />

      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />

    </View>
  );
};

export default HomeScreen;