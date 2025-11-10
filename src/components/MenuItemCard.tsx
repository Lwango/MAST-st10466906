// MenuItemCard.tsx – simple card component
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MenuItem } from '../types/MenuItem';
import colors from '../themes/colors';

interface Props { item: MenuItem; }

export const MenuItemCard: React.FC<Props> = ({ item }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.desc}>{item.description}</Text>
    <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 12, marginVertical: 6, borderRadius: 8, elevation: 2 },
  name: { fontSize: 16, fontWeight: '600' },
  desc: { fontSize: 14, color: '#555', marginVertical: 4 },
  price: { fontSize: 14, fontWeight: 'bold' },
});