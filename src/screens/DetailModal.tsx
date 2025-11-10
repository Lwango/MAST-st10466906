// src/screens/DetailModal.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MenuItem } from '../types/MenuItem';
import colors from '../themes/colors';

// If DetailModal receives item via props
type Props = {
  item: MenuItem;
};

const DetailModal: React.FC<Props> = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.desc}>{item.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  name: { fontSize: 24, fontWeight: 'bold', color: colors.text },
  desc: { fontSize: 16, color: colors.text },
});

export default DetailModal;