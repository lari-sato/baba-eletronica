import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

interface ExplanationButtonProps {
  title: string;
  description: string;
  buttonColor?: string;
  titleColor?: string;
}

export function ExplanationButton({
  title,
  description,
  buttonColor = "#b8191c",
  titleColor = "#bb0a0d",
}: ExplanationButtonProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={[styles.infoButton, { backgroundColor: buttonColor }]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="help-outline" size={32} color="#F6F6F6" />
        <Text style={styles.infoButtonText}>Explicação</Text>
      </TouchableOpacity>

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

            <Text style={[styles.modalTitle, { color: titleColor }]}>
              {title}
            </Text>

            <Text style={styles.modalText}>{description}</Text>
          </View>
        </View>
      </Modal>
    </>
  );
}