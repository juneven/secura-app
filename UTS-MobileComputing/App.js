import React from 'react';
import { View, Text, Alert, Platform, StyleSheet } from 'react-native';
import InfoCard from './src/components/InfoCard';
import DaftarMahasiswa from './src/screens/DaftarMahasiswa';

const tampilkanDetail = (pesan) => {
  if (Platform.OS === 'web') {
    window.alert(pesan);
  } else {
    Alert.alert('Detail', pesan);
  }
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Info Tugas</Text>

      <InfoCard
        title="Laporan Praktikum Mobile"
        status="selesai"
        onPress={() => tampilkanDetail('Laporan Praktikum Mobile: selesai')}
      />
      <InfoCard
        title="Proyek Capstone BudgetBuddy"
        status="proses"
        onPress={() => tampilkanDetail('Proyek Capstone BudgetBuddy: proses')}
      />

      <DaftarMahasiswa />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
});