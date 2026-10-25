
import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { BackButton } from "../../../components/backButton/backButton";
import { Nav } from "../../../components/navBar/navBar";
import { PageHeader } from "../../../components/pageHeader/pageHeader";
import { ConfirmationActions } from "../../../components/confirmationActions/confirmationActions";
import { styles } from "./styles";

import { removerSessao } from "../../../services/configuracaoInicial";
import { cancelarRegistroPush } from "../../../services/notificacoes";

export default function Settings({ navigation }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [saindo, setSaindo] = useState(false);

  const fecharModal = () => {
    if (!saindo) setModalVisible(false);
  };

  const handleConfirmLogout = async () => {
    if (saindo) return;
    setSaindo(true);

    try {
      // Cancela o token para não continuar recebendo alertas após logout.
      await cancelarRegistroPush();

      await removerSessao();
      setModalVisible(false);

      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (erro) {
      console.warn("Erro ao encerrar sessão:", erro);
      Alert.alert(
        "Não foi possível sair",
        "Não foi possível cancelar o registro de notificações e encerrar a sessão. " +
          "Verifique se o backend está ligado, se o celular está conectado à rede " +
          "e se as notificações estão autorizadas. Depois, tente novamente."
      );
    } finally {
      setSaindo(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonWrapper}>
        <BackButton />
      </View>

      <View style={styles.content}>
        <PageHeader title="Configurações" />

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate("WifiScreen")}
            activeOpacity={0.7}
            disabled={saindo}
          >
            <View style={styles.optionContent}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="help-circle"
                  size={25}
                  color="#696969"
                />
              </View>

              <Text style={styles.optionText}>
                Tutorial de Uso
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#696969"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.7}
            disabled={saindo}
          >
            <View style={styles.optionContent}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="log-out"
                  size={24}
                  color="#b63b3b"
                />
              </View>

              <Text
                style={[styles.optionText, styles.logoutText]}
              >
                Sair
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#696969"
            />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={fecharModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              {saindo
                ? "Cancelando o registro e encerrando a sessão..."
                : "Tem certeza que deseja sair da conta? Este celular deixará de receber alertas até você entrar novamente."}
            </Text>

            <ConfirmationActions
              cancelLabel="Cancelar"
              confirmLabel={saindo ? "Saindo..." : "Sair"}
              onCancel={fecharModal}
              onConfirm={handleConfirmLogout}
            />
          </View>
        </View>
      </Modal>

      <Nav activeTab="settings" />
    </View>
  );
}
