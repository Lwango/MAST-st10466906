// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import AddMenuScreen from './src/screens/AddMenuScreen';
import FilterScreen from './src/screens/FilterScreen';
import MenuScreen from './src/screens/MenuScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#c1453a' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddMenu" component={AddMenuScreen} />
        <Stack.Screen name="Filter" component={FilterScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

{}/*  
Kimia, 2025. Moonshot AI – Kimi Chat. [Online] Available at: https://kimi.moonshot.cn  
[Accessed 20 October 2025].

Google LLC, 2025. Google Search. [Online] Available at: https://www.google.com  
[Accessed 13 October 2025].

YouTube, 2025. React Native Tutorials. [Online] Available at: https://www.youtube.com  
[Accessed 20 October 2025].

Burger King Corporation, 2025. Menu & Nutritional Information. [Online] Available at: https://www.burgerking.com  
[Accessed 10 October 2025].

McDonald’s Corporation, 2025. Official Menu & Nutrition Guide. [Online] Available at: https://www.mcdonalds.com  
[Accessed 15 October 2025].

Hungry Lion (Pty) Ltd, 2025. Menu and Promotions. [Online] Available at: https://www.hungrylion.co.za  
[Accessed 15 October 2025].
*/