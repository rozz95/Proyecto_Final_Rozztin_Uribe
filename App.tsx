import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

// IMPORTA TUS PANTALLAS
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen'; 
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Pantalla de Login */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Iniciar Sesión' }} 
        />

        {/* Pantalla Principal */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Libros Trabajo' }} 
        />

        {/* Detalles (opcional) */}
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ title: 'Detalle del Libro' }} 
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ title: 'Perfil Usuario' }} 
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
