 import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MenuItem } from '../types/MenuItem';
import colors from '../themes/colors';

interface Props {
  item: MenuItem;
}

const MenuItemCard: React.FC<Props> = ({ item }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{item.name}</Text>
    <Text style={styles.desc}>{item.description}</Text>
    <Text style={styles.course}>Course: {item.course}</Text>
    <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondary,
    marginVertical: 8,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  title: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  desc: { fontSize: 14, marginVertical: 4 },
  course: { color: colors.accent },
  price: { fontWeight: '600', marginTop: 4 },
});

export default MenuItemCard;
