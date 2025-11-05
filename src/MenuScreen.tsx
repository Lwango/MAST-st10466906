// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MenuData from '../data/MenuData';
import colors from '../themes/colors';
import { MenuItem } from '../types/MenuItem';

type Props = {
  goToAdd: () => void;
  goToList: () => void;
  goToFilter: () => void;
};

const HomeScreen: React.FC<Props> = ({ goToAdd, goToList, goToFilter }) => {
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const listener = (newItems: MenuItem[]) => setItems(newItems);
    MenuData.subscribe(listener);
    return () => MenuData.unsubscribe(listener);
  }, []);

  // compute averages by course (use for loop)
  const computeAverages = () => {
    const totals: Record<string, number> = { Starters: 0, Mains: 0, Desserts: 0 };
    const counts: Record<string, number> = { Starters: 0, Mains: 0, Desserts: 0 };

    // using a for loop to sum and count
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const c = it.course || 'Mains';
      if (!totals[c]) {
        totals[c] = 0;
        counts[c] = 0;
      }
      totals[c] += it.price;
      counts[c] += 1;
    }

    const averages: Record<string, number> = {};
    for (const k of Object.keys(totals)) {
      averages[k] = counts[k] > 0 ? totals[k] / counts[k] : 0;
    }
    return averages;
  };

  // example while loop: count how many items have price > 0
  const countValidPrices = () => {
    let i = 0;
    let valid = 0;
    while (i < items.length) {
      if (items[i].price > 0) valid++;
      i++;
    }
    return valid;
  };

  const averages = computeAverages();
  const validCount = countValidPrices();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mbothweats — Home</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Average prices by course</Text>
        <Text>Starters: R{averages.Starters.toFixed(2)}</Text>
        <Text>Mains: R{averages.Mains.toFixed(2)}</Text>
        <Text>Desserts: R{averages.Desserts.toFixed(2)}</Text>
        <Text style={{ marginTop: 8 }}>Valid priced items: {validCount}</Text>
      </View>

      <View style={styles.buttons}>
        <Button title="Add Menu Item" onPress={goToAdd} color={colors.primary} />
        <View style={{ height: 12 }} />
        <Button title="View All Items" onPress={goToList} color={colors.accent} />
        <View style={{ height: 12 }} />
        <Button title="Filter by Course" onPress={goToFilter} color={colors.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 16, textAlign: 'center' },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  cardTitle: { fontWeight: '600', marginBottom: 8 },
  buttons: { marginTop: 8 },
});

export default HomeScreen;
