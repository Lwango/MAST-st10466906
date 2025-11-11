// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getMenuItems } from '../data/MenuData';
import colors from '../themes/colors';
import { MenuItem } from '../types/MenuItem';
import { RootStackParamList } from '../types/NavigationTypes';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    setItems(getMenuItems());
  }, []);

  const starters = items.filter(item => item.course === 'Starters').length;
  const mains = items.filter(item => item.course === 'Mains').length;
  const desserts = items.filter(item => item.course === 'Desserts').length;

  const avg = items.length
    ? (items.reduce((sum, item) => sum + item.price, 0) / items.length).toFixed(2)
    : '0.00';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mbothwe’s Eats</Text>

      {/* ✅ Fixed Layout: Flex 1 + textAlign center */}
      <View style={styles.countRow}>
        <TouchableOpacity
          style={[styles.countBox, { flex: 1 }]}
          onPress={() => navigation.navigate('Filter', { course: 'Starters' })}
        >
          <Text style={styles.count}>Starters ({starters})</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.countBox, { flex: 1 }]}
          onPress={() => navigation.navigate('Filter', { course: 'Mains' })}
        >
          <Text style={styles.count}>Mains ({mains})</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.countBox, { flex: 1 }]}
          onPress={() => navigation.navigate('Filter', { course: 'Desserts' })}
        >
          <Text style={styles.count}>Desserts ({desserts})</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.average}>Average Price: R{avg}</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddMenu')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: colors.text,
    textAlign: 'center',
  },
  countRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // ✅ Better than space-around for even spacing
    width: '100%',
    marginBottom: 30,
  },
  countBox: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center', // ✅ Center content
  },
  count: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center', // ✅ Ensure text doesn't overflow
  },
  average: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 40,
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    width: 65,
    height: 65,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;