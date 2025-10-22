// src/screens/AddMenuScreen.tsx  (Missing-info banner)
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { sampleDishes } from '../data/sampleDishes';
import { MenuItem } from '../../types/MenuItem';

interface Props { navigation: any; }

const AddMenuScreen: React.FC<Props> = ({ navigation }) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showCustom, setShowCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customDesc, setCustomDesc] = useState('');
  const [customPrice, setCustomPrice] = useState('');
  const [customCourse, setCustomCourse] = useState<'Starters' | 'Mains' | 'Desserts'>('Starters');
  const [error, setError] = useState('');

  // toggle sample dishes
  const toggle = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  // build final menu = chosen samples + 1 custom (if filled & valid)
  const saveAndGoBack = () => {
    if (showCustom) {
      if (!customName.trim() || !customDesc.trim() || !customPrice.trim()) {
        setError('Missing info');
        return;
      }
      setError(''); // clear error on success
    }

    const chosenSamples = sampleDishes.filter(d => selected.has(d.id));
    let final: MenuItem[] = [...chosenSamples];

    if (showCustom && customName.trim() && customDesc.trim() && customPrice.trim()) {
      const custom: MenuItem = {
        id: 'custom-' + Date.now(),
        name: customName.trim(),
        description: customDesc.trim(),
        course: customCourse,
        price: parseFloat(customPrice),
      };
      final.push(custom);
    }

    navigation.navigate('Home', { menu: final });
  };

  // group samples by course
  const grouped = (['Starters', 'Mains', 'Desserts'] as const).map(course => ({
    course,
    dishes: sampleDishes.filter(d => d.course === course),
  }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Choose Dishes</Text>

      {/* INLINE ERROR BANNER */}
      {error ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {/* =====  SAMPLE DISHES (grouped)  ===== */}
      {grouped.map(g => (
        <View key={g.course} style={styles.section}>
          <Text style={styles.sectionHeader}>{g.course}</Text>
          {g.dishes.map(d => (
            <TouchableOpacity
              key={d.id}
              style={[styles.card, selected.has(d.id) && styles.active]}
              onPress={() => toggle(d.id)}
            >
              <Text style={styles.name}>{d.name}</Text>
              <Text style={styles.desc}>{d.description}</Text>
              <Text style={styles.price}>R{d.price.toFixed(2)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {/* =====  COLLAPSIBLE “CREATE YOUR OWN”  ===== */}
      <TouchableOpacity
        style={styles.toggleBtn}
        onPress={() => {
          setShowCustom(!showCustom);
          setError('');
        }}
      >
        <Text style={styles.toggleTxt}>{showCustom ? '▲  Hide Custom Dish' : '▼  Create Your Own Dish'}</Text>
      </TouchableOpacity>

      {showCustom && (
        <View style={styles.customBox}>
          <TextInput
            style={styles.input}
            placeholder="Your dish name *"
            value={customName}
            onChangeText={setCustomName}
          />
          <TextInput
            style={styles.input}
            placeholder="Short description *"
            value={customDesc}
            onChangeText={setCustomDesc}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Price (R) *"
            keyboardType="numeric"
            value={customPrice}
            onChangeText={setCustomPrice}
          />

          {/* Course selector for custom dish */}
          <View style={styles.courseRow}>
            {(['Starters', 'Mains', 'Desserts'] as const).map(c => (
              <TouchableOpacity
                key={c}
                style={[styles.courseBtn, customCourse === c && styles.activeCourse]}
                onPress={() => setCustomCourse(c)}
              >
                <Text style={[styles.courseTxt, customCourse === c && styles.activeCourseTxt]}>{c}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* =====  SAVE BUTTON  ===== */}
      <TouchableOpacity style={styles.doneBtn} onPress={saveAndGoBack}>
        <Text style={styles.doneTxt}>Add to Menu  →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFF8F0', padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  errorBanner: { backgroundColor: '#E63946', padding: 10, borderRadius: 8, marginBottom: 15 },
  errorText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  section: { marginBottom: 20 },
  sectionHeader: { fontSize: 20, fontWeight: '600', color: '#333', marginBottom: 10 },
  card: { backgroundColor: '#fff', marginVertical: 6, padding: 15, borderRadius: 10, elevation: 2 },
  active: { backgroundColor: '#E63946' },
  name: { fontSize: 16, fontWeight: '600' },
  desc: { fontSize: 14, color: '#555', marginVertical: 4 },
  price: { fontSize: 14, fontWeight: 'bold' },
  toggleBtn: { backgroundColor: '#457B9D', padding: 12, borderRadius: 8, marginVertical: 15, alignItems: 'center' },
  toggleTxt: { color: '#fff', fontWeight: '600' },
  customBox: { backgroundColor: '#f5f5f5', padding: 15, borderRadius: 10, marginBottom: 20 },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 10, marginVertical: 6, borderColor: '#457B9D', borderWidth: 1 },
  courseRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  courseBtn: { flex: 1, padding: 10, marginHorizontal: 4, backgroundColor: '#ddd', borderRadius: 8, alignItems: 'center' },
  activeCourse: { backgroundColor: '#E63946' },
  courseTxt: { color: '#333', fontWeight: '600' },
  activeCourseTxt: { color: '#fff' },
  doneBtn: { backgroundColor: '#E63946', marginTop: 10, padding: 18, borderRadius: 25, alignItems: 'center' },
  doneTxt: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});

export default AddMenuScreen;