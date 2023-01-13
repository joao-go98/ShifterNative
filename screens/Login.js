import React, { useEffect, useState, useRef } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Layout, Tab, TabView, Input, Button, Divider, Text} from '@ui-kitten/components';
import FadeInOut from 'react-native-fade-in-out';

const LoginScreen = ({ navigation, route }) => {

  const {Splash} = route.params;
  //FAZER COM Q O ITEM SEJA A VARIAVEL Q INDICA SE JA VI O SPLASH SCREEN OU NAO

  const [inputUsername, setInputUsername] = useState('');
  const [inputText, setInputText] = useState('');
  const [inputPass, setInputPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function getAdmin(documentSnapshot){return documentSnapshot.get('admin');}
  function getEmail(documentSnapshot){return documentSnapshot.get('email');}

  const verificarUsernameEmail = () => {
    firestore()
    .collection('testeid')
    .doc(inputUsername)
    .get()
    .then(documentSnapshot => getEmail(documentSnapshot))
    .then(email => {
      console.log(email);
      //verificar se o username pertence mesmo ao user
      if(inputText == email)
      {
        pressionar()
      }
      else
      {
        alert("Combinação de Username + Email + Password errada!");
      }
    });
  };

  const pressionar = () => {
    firestore()
    .collection('testeid')
    .doc(inputUsername)
    .get()
    .then(documentSnapshot => {
      if (documentSnapshot.exists) {
        entrar()
      }
      else{
        alert("Combinação de Username + Email + Password errada!");
      }
      })
  };

 const entrar = () => {
    firestore()
    .collection('testeid')
    .doc(inputUsername)
    .get()
    .then(documentSnapshot => getAdmin(documentSnapshot))
    .then(admin => {
      console.log(admin);
      //depois de saber se é admin, faz o login
      auth()
      .signInWithEmailAndPassword(inputText, inputPass)
      .then(userCredentials => {
      const user = userCredentials.user;
      console.log('User is logged in: ', user.email);
      if (admin)
        navigation.replace("HomeAdmin", {Item: inputUsername});
      else
        navigation.replace("HomeNovo", {Item: inputUsername});
    })
      .catch(error => {
      alert("Combinação de Email + Password Errada");
      });
    });
  };

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  //REGISTER CODIGO

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
                //console.log('Acho q deu');
                navigation.replace("HomeNovo", {Item: inputUsername});
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

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const [esperaste, setEspera] = useState(true);
  const [esperasses, setEsperasse] = useState(true);
  const [jaEsperei] = useState(true);

  const yourFunction = async () => {
    await delay(5000);
    console.log("Waited 5s");
    setEspera(false)
    toggleVisible2()
  };

  useEffect(() => {
    //yourFunction()
    if(Splash)
    {
      //toggleVisible()
      //yourFunction()
      setEspera(false)
      toggleVisible2()
    }
    else
    {
      toggleVisible()
      yourFunction()
      //setEspera(false)
      //toggleVisible2()
    }
    
  }, []);

  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  }

  const toggleVisible2 = () => {
    setVisible2(!visible2);
  }

  //FAZER SPLASH
  if(esperaste)
  {
    return(
      <Layout>
        <FadeInOut visible={visible} duration={4500}>
        <Image source={{uri: 'https://cdn.discordapp.com/attachments/825439162551369789/1062811395206430901/Novo_Projeto.png'}}
        style={{width: 340, height: 800}}/>
        </FadeInOut>
      </Layout>
    )
  }
  else
  {

    if(esperasses)
    {
      return (
    <FadeInOut visible={visible2} duration={2000}>
    <TabView
      style={{ justifyContent: 'center' }}
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <Tab title='Login'>
        <Layout style={styles.tabContainer}>
        <Input
          value={inputUsername}
          placeholder="Username"
          onChangeText={text => setInputUsername(text)}
        />

        <Divider/>
        <Divider/>
        <Divider/>

        <Input
          value={inputText}
          placeholder="Email"
          onChangeText={text => setInputText(text)}
        />

        <Divider/>
        <Divider/>
        <Divider/>

        <Input
          value={inputPass}
          placeholder="Password"
          secureTextEntry={!showPassword}
          onChangeText={text => setInputPass(text)}
        />

        <Divider/>
        <Divider/>
        <Divider/>

        <Button
        onPress={() => setShowPassword(!showPassword)}>
        {showPassword ? "Esconder password" : "Mostrar password"}
        </Button>

        <Divider/>
        <Divider/>
        <Divider/>

        <Button onPress={verificarUsernameEmail}>Login</Button>

        </Layout>
      </Tab>
      <Tab title='Register'>
        <Layout style={styles.tabContainer}>
        <Input
          value={inputUsername}
          placeholder="Username"
          onChangeText={text => setInputUsername(text)}
        />

        <Divider/>
        <Divider/>
        <Divider/>

        <Input
          value={inputText}
          placeholder="Email"
          onChangeText={text => setInputText(text)}
        />

        <Divider/>
        <Divider/>
        <Divider/>

        <Input
          value={inputPass}
          placeholder="Password"
          onChangeText={text => setInputPass(text)}
        />

        <Divider/>
        <Divider/>
        <Divider/>

        <Button onPress={handlePress}>
        Registar Conta
        </Button>

        </Layout>
      </Tab>
    </TabView>
    </FadeInOut>
      );

    }

  }


};


const styles = StyleSheet.create({
  tabContainer: {
    //alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30
  },
  teste: {
    //alignItems: 'center',
    //justifyContent: 'center',
    paddingTop: 200
  },
});

export default LoginScreen;