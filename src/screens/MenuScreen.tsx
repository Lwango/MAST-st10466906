// src/screens/MenuScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import MenuData from '../data/MenuData'; // ✅ Make sure this file exists!
import { MenuItemCard } from '../components/MenuItemCard'; // ✅ Named import
import { MenuItem } from '../types/MenuItem';
import colors from '../themes/colors';

type Props = {
  goHome: () => void;
};

const MenuScreen: React.FC<Props> = ({ goHome }) => {
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const listener = (newItems: MenuItem[]) => setItems(newItems);
    MenuData.subscribe(listener);
    return () => MenuData.unsubscribe(listener);
  }, []);

  const rendered = [];
  let i = 0;
  while (i < items.length) {
    rendered.push(<MenuItemCard key={items[i].id} item={items[i]} />);
    i++;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Menu Items</Text>
      <ScrollView style={{ flex: 1 }}>
        {rendered.length > 0 ? rendered : <Text style={styles.no}>No items yet.</Text>}
      </ScrollView>
      <Button title="Back Home" onPress={goHome} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.background },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: colors.text },
  no: { textAlign: 'center', marginTop: 20, color: colors.text },
});

export default MenuScreen;