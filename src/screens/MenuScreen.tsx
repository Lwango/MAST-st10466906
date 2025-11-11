// src/screens/MenuScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { getMenuItems, removeMenuItem } from '../data/MenuData';
import colors from '../themes/colors';
import { MenuItem } from '../types/MenuItem';

type Props = {
  goHome: () => void;
};

const MenuScreen: React.FC<Props> = ({ goHome }) => {
  const [items, setItems] = useState<MenuItem[]>([]);

  // Refresh items from shared data source
  const refreshData = () => {
    setItems(getMenuItems());
  };

  useEffect(() => {
    refreshData();
    // Optional: If using React Navigation, listen for focus to reload
    // If not, just remove the next 3 lines — it will still work on mount
  }, []);

  // Handle item removal with confirmation
  const handleRemove = (id: string, name: string) => {
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            removeMenuItem(id);
            refreshData();
          },
        },
      ]
    );
  };

  // Calculate average price
  const averagePrice =
    items.length > 0
      ? (items.reduce((sum, item) => sum + item.price, 0) / items.length).toFixed(2)
      : '0.00';

  // Render using a WHILE LOOP (as required)
  const renderedItems = [];
  let i = 0;
  while (i < items.length) {
    const item = items[i];
    renderedItems.push(
      <View key={item.id} style={styles.card}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.desc}>{item.description}</Text>
          <Text style={styles.price}>
            R{item.price.toFixed(2)} • {item.course}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemove(item.id, item.name)}
        >
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    );
    i++;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Menu Items</Text>
      <Text style={styles.average}>Average Price: R{averagePrice}</Text>

      <ScrollView style={{ flex: 1 }}>
        {renderedItems.length > 0 ? (
          renderedItems
        ) : (
          <Text style={styles.emptyText}>No menu items available.</Text>
        )}
      </ScrollView>

      <Button title="Back to Home" onPress={goHome} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: colors.text,
  },
  average: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    color: colors.primary,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.text,
  },
  desc: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  price: {
    fontSize: 13,
    fontStyle: 'italic',
    color: colors.primary,
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  removeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#777',
    fontStyle: 'italic',
  },
});

export default MenuScreen;