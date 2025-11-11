// src/screens/FilterScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getMenuItems, removeMenuItem } from '../data/MenuData';
import colors from '../themes/colors';
import { MenuItem } from '../types/MenuItem';
import { RootStackParamList } from '../types/NavigationTypes';

type Props = {
  route: RouteProp<RootStackParamList, 'Filter'>;
  navigation: StackNavigationProp<RootStackParamList, 'Filter'>;
};

const FilterScreen: React.FC<Props> = ({ route, navigation }) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const course = route.params?.course || null;

  useEffect(() => {
    const all = getMenuItems();
    if (course) {
      setItems(all.filter(item => item.course === course));
    } else {
      setItems(all);
    }
  }, [course]);

  const handleRemove = (id: string) => {
    removeMenuItem(id);
    setItems(getMenuItems().filter(item => item.course === course));
  };

  const avg =
    items.length > 0
      ? (items.reduce((sum, item) => sum + item.price, 0) / items.length).toFixed(2)
      : '0.00';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {course ? `${course} Dishes` : 'All Dishes'}
      </Text>
      <Text style={styles.average}>Average: R{avg}</Text>

      <ScrollView style={{ flex: 1 }}>
        {items.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
            </View>
            <Button title="Remove" color="#dc3545" onPress={() => handleRemove(item.id)} />
          </View>
        ))}
      </ScrollView>

      <Button title="Back to Home" onPress={() => navigation.goBack()} />
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
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: colors.text,
  },
  average: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    color: colors.primary,
    fontWeight: '600',
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
});

export default FilterScreen;