// FilterScreen.tsx – guest can filter menu by course (Starters only, etc.)
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MenuItem } from '../../types/MenuItem';
import { globalMenu } from '../data/globalMenu';

export const FilterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [filter, setFilter] = useState<'All' | 'Starters' | 'Mains' | 'Desserts'>('All');

  const filtered = filter === 'All' ? globalMenu : globalMenu.filter(i => i.course === filter);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu</Text>

      {/* filter buttons */}
      <View style={styles.filterRow}>
        {(['All', 'Starters', 'Mains', 'Desserts'] as const).map(c => (
          <TouchableOpacity
            key={c}
            style={[styles.filterBtn, filter === c && styles.activeFilter]}
            onPress={() => setFilter(c)}
          >
            <Text style={[styles.filterTxt, filter === c && styles.activeFilterTxt]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* filtered list */}
      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
      />

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.backBtnTxt}>←  Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  filterRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  filterBtn: { flex: 1, padding: 10, marginHorizontal: 4, backgroundColor: '#ddd', borderRadius: 8, alignItems: 'center' },
  activeFilter: { backgroundColor: '#E63946' },
  filterTxt: { color: '#333', fontWeight: '600' },
  activeFilterTxt: { color: '#fff' },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 8, elevation: 2, marginVertical: 6 },
  name: { fontSize: 16, fontWeight: '600' },
  desc: { fontSize: 14, color: '#555', marginVertical: 4 },
  price: { fontSize: 14, fontWeight: 'bold' },
  backBtn: { backgroundColor: '#E63946', marginTop: 20, padding: 15, borderRadius: 25, alignItems: 'center' },
  backBtnTxt: { color: '#fff', fontWeight: 'bold' },
});

export default FilterScreen;