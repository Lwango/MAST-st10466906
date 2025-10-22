// src/screens/HomeScreen.tsx  (new background image only)
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  ImageBackground, // ← added
} from 'react-native';
import { MenuItem } from '../types/MenuItem';

const { width } = Dimensions.get('window');
const COL_WIDTH = (width - 48) / 3;

interface Props {
  navigation: any;
  route: { params?: { menu?: MenuItem[] } };
}

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (route.params?.menu) setItems(route.params.menu);
  }, [route.params?.menu]);

  const grouped = (['Starters', 'Mains', 'Desserts'] as const).map(course => ({
    course,
    dishes: items.filter(i => i.course === course),
  }));

  return (
    <ImageBackground
      source={require('../../assets/newBg.jpg')} // ← CHANGE FILE NAME HERE
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.header}>🍽️  Mbothwe’s Eats</Text>

        <View style={styles.colsWrapper}>
          {grouped.map(g => (
            <View key={g.course} style={styles.col}>
              <Text style={styles.colHeader}>{g.course} ({g.dishes.length})</Text>
              <FlatList
                data={g.dishes}
                keyExtractor={i => i.id}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <Text style={styles.dishName}>{item.name}</Text>
                    <Text style={styles.dishDesc}>{item.description}</Text>
                    <Text style={styles.dishPrice}>R{item.price.toFixed(2)}</Text>
                  </View>
                )}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
                ListFooterComponent={<View style={{ height: 70 }} />}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddMenu')}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1, width: '100%', height: '100%' },
  overlay: { flex: 1, backgroundColor: 'rgba(255,248,240,0.85)', paddingTop: 60 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  colsWrapper: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 },
  col: { width: COL_WIDTH },
  colHeader: { fontSize: 16, fontWeight: '600', textAlign: 'center', marginBottom: 8 },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 8, elevation: 2 },
  dishName: { fontSize: 14, fontWeight: '600' },
  dishDesc: { fontSize: 13, color: '#555', marginVertical: 4 },
  dishPrice: { fontSize: 13, fontWeight: 'bold' },
  fab: { position: 'absolute', right: 24, bottom: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: '#E63946', justifyContent: 'center', alignItems: 'center', elevation: 8 },
  fabText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
});

export default HomeScreen;