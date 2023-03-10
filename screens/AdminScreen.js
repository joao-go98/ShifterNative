//import * as React from 'react';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {Layout, Text, Button, Divider} from '@ui-kitten/components';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

const HomeAdmin = ({ route, navigation }) => {

  const {Item} = route.params;

  const logout = () => {
    auth()
    .signOut()
    .then(navigation.replace("Login", {Splash: true}))
  };

  return (
    <Layout style={styles.row}>

      <View style={styles.alternativeContainer}>
      <Text style={styles.text} appearance='alternative'>Admin {Item} </Text>
      </View>

      <Divider/>

      <Button onPress={() => navigation.navigate("Criar Turnos", {Item: Item})}>
      Criar Turno
      </Button>

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

export default HomeAdmin;