import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, Modal } from "react-native";

import { ResultPage } from "../../../components/resultPage/resultPage";
import { DiscomfortIcon } from "../../../components/babyIcons/babyIcons";
import { BackButton } from "../../../components/backButton/backButton";
import { Nav } from "../../../components/nav/nav";
import { styles } from "./styles";

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