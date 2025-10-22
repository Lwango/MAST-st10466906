import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MenuItem } from '../../types/MenuItem';
import colors from '../../themes/colors';
// @ts-ignore
const uuid = require('react-native-uuid');

interface Props {
  navigation: any;
}

const STORAGE_KEY = '@mbothwe_menu';

const AddMenuScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<'Starters' | 'Mains' | 'Desserts'>('Starters');
  const [price, setPrice] = useState('');

  const handleAdd = async () => {
    if (!name || !description || !price) {
      Alert.alert('Missing info', 'Please fill all fields.');
      return;
    }
    const newItem: MenuItem = {
      id: uuid.v4(),
      name,
      description,
      course,
      price: parseFloat(price),
    };
    try {
      const existing = await AsyncStorage.getItem(STORAGE_KEY);
      const items: MenuItem[] = existing ? JSON.parse(existing) : [];
      items.push(newItem);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      navigation.navigate('Home', { refresh: true }); // flag to force reload
    } catch (e) {
      Alert.alert('Save failed', String(e));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add a New Dish</Text>

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Picker
        selectedValue={course}
        onValueChange={setCourse}
        style={styles.input}
      >
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Mains" value="Mains" />
        <Picker.Item label="Desserts" value="Desserts" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Price (R)"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <Button title="Add Dish" onPress={handleAdd} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', color: colors.text, textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: 'white', borderRadius: 8, padding: 10, marginVertical: 8, borderColor: colors.accent, borderWidth: 1 },
});

export default AddMenuScreen;