import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PlaceBets from './components/PlaceBets';
import Results from './components/Results';
import Bankroll from './components/Bankroll';
import { UserContext, UserProvider } from './components/UserContext';

enableScreens();

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="PlaceBets" component={PlaceBets} />
        <Stack.Screen name="Results" component={Results} />
        <Stack.Screen name="Bankroll" component={Bankroll} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}
