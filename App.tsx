 // App.tsx  (project root)
import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';        // ← quotes + correct case
import AddMenuScreen from './src/screens/AddMenuScreen';  // ← quotes + correct case

export type RootStackParamList = {
  Home: undefined;
  AddMenu: undefined;
  DetailModal: { item: any };
};

const Stack = createStackNavigator<RootStackParamList>();

// ----------  SUPER-SIMPLE MODAL (diagnostic)  ----------
const DetailModal: React.FC<{ route: { params: { item: any } } }> = ({ route }) => {
  const item = route?.params?.item;
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 40 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Detail</Text>
      <Text>{item ? JSON.stringify(item, null, 2) : 'No item provided'}</Text>
    </View>
  );
};
// -------------------------------------------------------

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddMenu" component={AddMenuScreen} options={{ presentation: 'modal' }} />
        <Stack.Screen name="DetailModal" component={DetailModal} options={{ presentation: 'transparentModal' }} />
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