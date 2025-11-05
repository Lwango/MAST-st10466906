// src/screens/AddMenuScreen.tsx
import React, { JSX, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MenuData from '../data/MenuData';
import colors from '../../themes/colors';
import { MenuItem } from '../../types/MenuItem';

type Props = {
  goHome: () => void;
};

const AddMenuScreen: React.FC<Props> = ({ goHome }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<'Starters' | 'Mains' | 'Desserts' | string>('Starters');
  const [price, setPrice] = useState('');
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const l = (newItems: MenuItem[]) => setItems(newItems);
    MenuData.subscribe(l);
    return () => MenuData.unsubscribe(l);
  }, []);

  const handleAdd = () => {
    if (!name.trim() || !description.trim() || !price.trim()) {
      Alert.alert('Missing fields', 'Please fill all fields');
      return;
    }
    const p = parseFloat(price);
    if (isNaN(p) || p < 0) {
      Alert.alert('Invalid price', 'Enter a valid positive number');
      return;
    }

    MenuData.add({ name: name.trim(), description: description.trim(), course, price: p });
    setName('');
    setDescription('');
    setCourse('Starters');
    setPrice('');
  };

  const handleRemove = (id: string) => {
    MenuData.remove(id);
  };

  // render current items using a for loop to satisfy requirement
  const renderedItems: JSX.Element[] = [];
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    renderedItems.push(
      <View key={it.id} style={styles.listItem}>
        <Text style={styles.itemText}>{it.name} — R{it.price.toFixed(2)}</Text>
        <Button title="Remove" onPress={() => handleRemove(it.id)} color="#d9534f" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Menu Item</Text>

      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />

      <Picker selectedValue={course} onValueChange={(v) => setCourse(v)} style={styles.picker}>
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Mains" value="Mains" />
        <Picker.Item label="Desserts" value="Desserts" />
      </Picker>

      <TextInput style={styles.input} placeholder="Price (R)" keyboardType="numeric" value={price} onChangeText={setPrice} />

      <View style={{ marginVertical: 8 }}>
        <Button title="Add Dish" onPress={handleAdd} color={colors.primary} />
      </View>

      <Text style={{ marginTop: 12, fontWeight: '600' }}>Existing items (remove if needed)</Text>
      {renderedItems.length === 0 ? <Text style={{ marginTop: 6 }}>No items yet.</Text> : renderedItems}
      <View style={{ height: 20 }} />
      <Button title="Done / Back Home" onPress={goHome} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: colors.background, minHeight: '100%' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: colors.text },
  input: { backgroundColor: 'white', padding: 10, borderRadius: 8, marginVertical: 6, borderWidth: 1, borderColor: colors.accent },
  picker: { backgroundColor: 'white', marginVertical: 6 },
  listItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  itemText: { fontSize: 16 },
});

export default AddMenuScreen;
