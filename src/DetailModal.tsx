// src/screens/MenuScreen.tsx
import React, { JSX, useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import MenuData from '../data/MenuData';
import MenuItemCard from '../../components/MenuItemCard';
import { MenuItem } from '../../types/MenuItem';
import colors from '../../themes/colors';

type Props = {
  goHome: () => void;
};

const MenuScreen: React.FC<Props> = ({ goHome }) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  useEffect(() => {
    const l = (newItems: MenuItem[]) => setItems(newItems);
    MenuData.subscribe(l);
    return () => MenuData.unsubscribe(l);
  }, []);

  // render using a while loop
  const rendered: JSX.Element[] = [];
  let i = 0;
  while (i < items.length) {
    rendered.push(<MenuItemCard key={items[i].id} item={items[i]} />);
    i++;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Menu Items</Text>
      <ScrollView style={{ flex: 1 }}>{rendered.length ? rendered : <Text style={styles.no}>No items yet.</Text>}</ScrollView>
      <Button title="Back Home" onPress={goHome} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.background },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: colors.text },
  no: { textAlign: 'center', marginTop: 20 },
});

export default MenuScreen;
