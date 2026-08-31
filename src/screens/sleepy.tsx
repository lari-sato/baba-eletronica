import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Sleepy} from "./babyIcons";

export default function App() {
  return (
    <SafeAreaView style={styles.SafeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#454545" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Seu bebê está chorando</Text>
          <Text style={styles.subtitle}>Choro detectado às</Text>
        </View>
        <View style={styles.circle}>
          <Sleepy size={140} color="#8D49A4" />
        </View>
        <View style={styles.card}>
          <Text style={styles.message}>70% de chance de ser:</Text>
          <Text style={styles.result}>Sono</Text>
        </View>
        
        <View style={styles.nav}>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="time-outline" size={26} color="#696969" />
            <Text style={styles.navText}>Histórico</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="settings-outline" size={26} color="#696969" />
            <Text style={styles.navText}>Configurações</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    backgroundColor: "#E4C9F4",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    paddingBottom: 30,
  },
  header: {
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 27,
    color: "#2D2C2C",
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 23,
    color: "#444040",
    fontWeight: "600",
  },
  circle: {
    width: 200,
    height: 200,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,

    borderWidth: 5,
    borderColor: "#8D49A4",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "75%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    fontSize: 20,
    color: "#454545",
    fontWeight: "500",
  },
  result: {
    fontSize: 27,
    color: "#454545",
    fontWeight: "700",
    marginTop: 6,
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#F6F6F6",
    width: 47,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginTop: 10,
  },
  
  nav: {
    width: "45%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 20,
    elevation: 6,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    fontSize: 12,
    color: "#696969",
    marginTop: 4,
    fontWeight: "700",
  },
});
