// src/screens/HomeScreen.tsx  (Stage-1 : 3-columns, counts, no bg yet)
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MenuItem } from '../types/MenuItem';

const STORAGE_KEY = '@mbothwe_menu';
const { width } = Dimensions.get('window');
const COL_WIDTH = (width - 48) / 3;   // even 3 columns

interface Props { navigation: any; }

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [items, setItems] = useState<MenuItem[]>([]);

  const loadMenu = async () => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    setItems(data ? JSON.parse(data) : []);
  };

  // TEMP seed – DELETE after first run
  useEffect(() => {
    const seed = async () => {
      const fake: MenuItem = {
        id: 'seed',
        name: 'Soup of the Day',
        description: 'Rich tomato basil soup',
        course: 'Starters',
        price: 45.0,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([fake]));
      loadMenu();
    };
    seed();
  }, []);

  useEffect(() => {
    const focus = navigation.addListener('focus', loadMenu);
    return focus;
  }, [navigation]);

  const grouped = (['Starters', 'Mains', 'Desserts'] as const).map(course => ({
    course,
    dishes: items.filter(i => i.course === course),
  }));

  const openDetail = (item: MenuItem) =>
    navigation.navigate('DetailModal', { item });

  const renderDish = (item: MenuItem) => (
    <TouchableOpacity style={styles.card} onPress={() => openDetail(item)}>
      <Text style={styles.dishName}>{item.name}</Text>
      <Text style={styles.dishPrice}>R{item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🍽️  Mbothwe’s Eats</Text>

      <View style={styles.colsWrapper}>
        {grouped.map(g => (
          <View key={g.course} style={styles.col}>
            <Text style={styles.colHeader}>
              {g.course} ({g.dishes.length})
            </Text>
            <FlatList
              data={g.dishes}
              keyExtractor={i => i.id}
              renderItem={({ item }) => renderDish(item)}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
              ListFooterComponent={<View style={{ height: 70 }} />} // space for FAB
            />
          </View>
        ))}
      </View>

      {/* Floating add button */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddMenu')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0', paddingTop: 60 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  colsWrapper: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 },
  col: { width: COL_WIDTH },
  colHeader: { fontSize: 16, fontWeight: '600', textAlign: 'center', marginBottom: 8 },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
  dishName: { fontSize: 14, fontWeight: '600' },
  dishPrice: { fontSize: 13, color: '#666', marginTop: 4 },
  fab: { position: 'absolute', right: 24, bottom: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: '#E63946', justifyContent: 'center', alignItems: 'center', elevation: 8 },
  fabText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
});

export default HomeScreen;