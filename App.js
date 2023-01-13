import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import HomeAdmin from './screens/AdminScreen';
import LoginScreen from './screens/Login';
import Home from './screens/Home';
import TurnoScreen from './screens/TurnoScreen';
import DetalhesTurnoScreen from './screens/DetalhesTurnoScreen';
import Home2 from './screens/Home2';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Homes" component={Home} />
      <Stack.Screen name="HomeNovo" component={Home2} />
      <Stack.Screen name="HomeAdmin" component={HomeAdmin}/>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} initialParams={true}/>
      <Stack.Screen name="Criar Turnos" component={TurnoScreen}/>
      <Stack.Screen name="DetalhesTurnos" component={DetalhesTurnoScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    </ApplicationProvider>
  );
}

export default App;

