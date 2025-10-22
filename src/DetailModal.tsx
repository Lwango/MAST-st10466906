  import React from 'react';
 import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
 import { MenuItem } from '../types/MenuItem';
 import colors from '../themes/colors';
 
 interface Props {
   route: { params: { item: MenuItem } };
   navigation: any;
 }
 
 const DetailModal: React.FC<Props> = ({ route, navigation }) => {
   const { item } = route.params;
 
   return (
     <ImageBackground source={require('../../assets/bg.jpg')} style={styles.bg} resizeMode="cover">
       <View style={styles.container}>
         <ScrollView contentContainerStyle={styles.card}>
           <Text style={styles.name}>{item.name}</Text>
           <Text style={styles.course}>Course: {item.course}</Text>
           <Text style={styles.desc}>{item.description}</Text>
           <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
 
           <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
             <Text style={styles.closeTxt}>Close</Text>
           </TouchableOpacity>
         </ScrollView>
       </View>
     </ImageBackground>
   );
 };
 
 const styles = StyleSheet.create({
   bg: { flex: 1 },
   container: { flex: 1, backgroundColor: colors.modalBackdrop, justifyContent: 'center', padding: 24 },
   card: { backgroundColor: colors.secondary, borderRadius: 16, padding: 20 },
   name: { fontSize: 26, fontWeight: 'bold', color: colors.text, marginBottom: 6 },
   course: { fontSize: 16, color: colors.accent, marginBottom: 10 },
   desc: { fontSize: 15, lineHeight: 22, marginBottom: 12 },
   price: { fontSize: 20, fontWeight: '600', color: colors.primary, marginBottom: 20 },
   closeBtn: { backgroundColor: colors.primary, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
   closeTxt: { color: 'white', fontWeight: '600' },
 });
 
 export default DetailModal;