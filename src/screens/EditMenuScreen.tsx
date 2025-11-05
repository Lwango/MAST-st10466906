// EditMenuScreen.tsx – separate screen to add/remove items (uses global array)
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { MenuItem } from '../../types/MenuItem';
import { addDish, globalMenu } from '../data/globalMenu';

export const EditMenuScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState<'Starters' | 'Mains' | 'Desserts'>('Starters');

  const handleAdd = () => {
    if (!name.trim() || !desc.trim() || !price.trim()) {
      Alert.alert('Missing info', 'Please fill all fields.');
      return;
    }
    const newDish: MenuItem = {
      id: 'custom-' + Date.now(),
      name: name.trim(),
      description: desc.trim(),
      course,
      price: parseFloat(price),
    };
    addDish(newDish);
    navigation.navigate('Home'); // refresh Home (no params needed)
  };

  const removeFirst = (id: string) => {
    // while-loop requirement
    let i = 0;
    while (i < globalMenu.length) {
      if (globalMenu[i].id === id) {
        globalMenu.splice(i, 1);
        break;
      }
      i++;
    }
    navigation.navigate('Home'); // refresh Home (no params needed)
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Menu</Text>

      {/* ---- ADD NEW DISH ---- */}
      <Text style={styles.subTitle}>Add New Dish</Text>
      <TextInput style={styles.input} placeholder="Dish name *" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Description *" value={desc} onChangeText={setDesc} multiline />
      <TextInput style={styles.input} placeholder="Price (R) *" keyboardType="numeric" value={price} onChangeText={setPrice} />

      <View style={styles.courseRow}>
        {(['Starters', 'Mains', 'Desserts'] as const).map(c => (
          <TouchableOpacity
            key={c}
            style={[styles.courseBtn, course === c && styles.activeCourse]}
            onPress={() => setCourse(c)}
          >
            <Text style={[styles.courseTxt, course === c && styles.activeCourseTxt]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
        <Text style={styles.addBtnTxt}>Add Dish</Text>
      </TouchableOpacity>

      {/* ---- REMOVE ITEMS ---- */}
      <Text style={styles.subTitle}>Remove Items (tap to delete)</Text>
      {globalMenu.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.removeCard}
          onPress={() => removeFirst(item.id)}
        >
          <Text style={styles.removeName}>{item.name}</Text>
          <Text style={styles.removeDesc}>{item.description}</Text>
          <Text style={styles.removePrice}>R{item.price.toFixed(2)}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.backBtnTxt}>←  Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0', padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  subTitle: { fontSize: 18, fontWeight: '600', marginVertical: 10 },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 10, marginVertical: 6, borderColor: '#457B9D', borderWidth: 1 },
  courseRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  courseBtn: { flex: 1, padding: 10, marginHorizontal: 4, backgroundColor: '#ddd', borderRadius: 8, alignItems: 'center' },
  activeCourse: { backgroundColor: '#E63946' },
  courseTxt: { color: '#333', fontWeight: '600' },
  activeCourseTxt: { color: '#fff' },
  addBtn: { backgroundColor: '#E63946', marginVertical: 20, padding: 15, borderRadius: 25, alignItems: 'center' },
  addBtnTxt: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  removeCard: { backgroundColor: '#fff', marginVertical: 6, padding: 12, borderRadius: 8, elevation: 2 },
  removeName: { fontSize: 16, fontWeight: '600' },
  removeDesc: { fontSize: 14, color: '#555', marginVertical: 2 },
  removePrice: { fontSize: 14, fontWeight: 'bold' },
  backBtn: { backgroundColor: '#E63946', marginTop: 20, padding: 15, borderRadius: 25, alignItems: 'center' },
  backBtnTxt: { color: '#fff', fontWeight: 'bold' },
});

export default EditMenuScreen;