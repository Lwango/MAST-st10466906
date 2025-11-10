// App.tsx – 3-screen navigation: Home, EditMenu, Filter
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import EditMenuScreen from './src/screens/EditMenuScreen';
import FilterScreen from './src/screens/FilterScreen';

export type RootStackParamList = {
  Home: undefined;
  EditMenu: undefined;
  Filter: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EditMenu" component={EditMenuScreen} />
        <Stack.Screen name="Filter" component={FilterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

{/*  
Kimia, 2025. Moonshot AI – Kimi Chat. [Online] Available at: https://kimi.moonshot.cn
[Accessed 20 October 2025].
Google LLC, 2025. Google Search. [Online] Available at: https://www.google.com
[Accessed 13 October 2025].
YouTube, 2025. React Native Tutorials. [Online] Available at: https://www.youtube.com
[Accessed 20 October 2025].
Burger King Corporation, 2025. Menu & Nutritional Information. [Online] Available at: https://www.burgerking.com
[Accessed 10 October 2025].*/}