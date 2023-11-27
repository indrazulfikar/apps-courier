import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import { router, Link } from "expo-router";
import Header from './_components/Header';
import Footer from './_components/Footer';

export default function index() {
  return (
    <SafeAreaView style={styles.container}>
    <Header/>
    <Footer  />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
