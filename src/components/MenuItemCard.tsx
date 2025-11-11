// src/components/MenuItemCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../themes/colors';

type Props = {
  item: {
    name: string;
    description: string;
    price: number;
    course: string;
  };
};

const MenuItemCard: React.FC<Props> = ({ item }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <Text style={styles.price}>R{item.price.toFixed(2)} • {item.course}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  desc: {
    fontSize: 14,
    color: '#555',
    marginVertical: 6,
  },
  price: {
    fontSize: 13,
    fontStyle: 'italic',
    color: colors.primary,
  },
});

export { MenuItemCard };