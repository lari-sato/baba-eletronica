import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BackButton } from "../components/backButton";
import { Nav } from "../components/nav";

export default function Settings({ navigation }: any) {
    const [modalVisible, setModalVisible] = useState(false);
    const handleConfirmLogout = () => {
    setModalVisible(false);
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Configurações</Text>
      <View style={styles.divider} />

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.optionButton}
        onPress={() => navigation.navigate("WifiScreen")}>   
          <View style={styles.optionContent}>
            <Ionicons name="wifi" size={24} color="#696969" />
            <Text style={styles.optionText}>Conectar Wi-Fi</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#696969" />
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.optionButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}>
          <View style={styles.optionContent}>
            <Ionicons name="log-out" size={24} color="#c92023" />
            <Text style={[styles.optionText, styles.logoutText]}>
              Sair da conta
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#696969" />
        </TouchableOpacity>
      </View>
       
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>

            <Text style={styles.modalText}>
              Tem certeza que deseja sair da conta?
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.confirmButton]}
                onPress={handleConfirmLogout}
                activeOpacity={0.7}
              >
                <Text style={styles.confirmText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Nav
        activeTab="settings"
        onPressHistory={() => navigation.navigate("History")}
        onPressSettings={() => console.log("Já está nas configurações")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BFDDF3",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingTop: 45,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#407888",
    marginTop: 10,
  },
  divider: {
    height: 2,
    backgroundColor: "#8FB2CA",
    width: "88%",
    alignSelf: "center",
    marginTop: -100,
    marginBottom: 15,
  },
  menuContainer: {
    width: "100%",
    gap: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  optionButton: {
    width: "90%",
    height: 55,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  logoutText: {
    color: "#c92023",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#0000008e",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "50%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 22,
    alignItems: "center",
    position: "relative",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  
  },
  modalText : {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D2D2D",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 30,
    width: "80%",
  },
  actionButton: {
    flex: 1,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#E0E0E0",
  },
  confirmButton: {
    backgroundColor: "#C83737",
  },
  cancelText: {
    color: "#2D2D2D",
    fontWeight: "600",
    fontSize: 14,
  },
  confirmText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
});
