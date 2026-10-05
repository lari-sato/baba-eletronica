import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { BackButton } from "../../../components/backButton/backButton";
import { Nav } from "../../../components/nav/nav";
import { styles } from "./styles";

export default function Settings({ navigation }: any) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirmLogout = () => {
    setModalVisible(false);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <BackButton />

      <View style={styles.content}>
        <Text style={styles.title}>Configurações</Text>

        <View style={styles.divider} />

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate("WifiScreen")}
            activeOpacity={0.7}
          >
            <View style={styles.optionContent}>
              <Ionicons name="wifi" size={24} color="#696969" />

              <Text style={styles.optionText}>Conectar Wi-Fi</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#696969" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.7}
          >
            <View style={styles.optionContent}>
              <Ionicons name="log-out" size={24} color="#c92023" />

              <Text style={[styles.optionText, styles.logoutText]}>
                Sair da conta
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#696969" />
          </TouchableOpacity>
        </View>
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

      <Nav activeTab="settings" />
    </View>
  );
}