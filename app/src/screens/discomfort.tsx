import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";

import { ResultPage } from "../components/resultPage";
import { DiscomfortIcon } from "../components/babyIcons";
import { BackButton } from "../components/backButton";
import { Nav } from "../components/nav";

export default function Discomfort({ route }: any) {
  const { resultadoBackend } = route.params;

  const [modalVisible, setModalVisible] = useState(false);

  const horario = resultadoBackend?.horario ?? "--:--";
  const porcentagem = Math.round(Number(resultadoBackend?.confianca ?? 0) * 100);

  return (
    <View style={styles.container}>
      <BackButton />

      <ResultPage
        time={horario}
        percentage={porcentagem}
        result="Desconforto"
        borderColor="#ca420c"
        icon={<DiscomfortIcon size={150} color="#ca420c" />}
      />

      <TouchableOpacity
        style={styles.infoButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="help-outline" size={35} color="#454545" />
        <Text style={styles.infoButtonText}>Explicação</Text>
      </TouchableOpacity>

      <Nav />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIconButton}
              onPress={() => setModalVisible(false)}
              activeOpacity={0.6}
            >
              <Ionicons name="close" size={24} color="#696969" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>O que é desconforto?</Text>

            <Text style={styles.modalText}>
              O choro classificado como desconforto pode estar associado a
              estímulos físicos ou ambientais que causam incômodo ao bebê,
              como temperatura inadequada, fralda suja, posição desconfortável,
              excesso de estímulos ou irritação geral. 
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffac77",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    paddingBottom: 30,
    paddingTop: 45,
  },
  infoButton: {
    backgroundColor: "#f7f9fa",
    width: "35%",
    height: 70,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
    elevation: 6,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 3.3,
    borderColor: "#696969",
  },
  infoButtonText: {
    fontSize: 16,
    color: "#454545",
    marginTop: -5,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 25,
    alignItems: "center",
    position: "relative",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  closeIconButton: {
    position: "absolute",
    top: 12,
    right: 12,
    padding: 5,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ca420c",
    marginBottom: 15,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  modalText: {
    fontSize: 17,
    color: "#696969",
    textAlign: "center",
    lineHeight: 25,
    width: "100%",
  },
});