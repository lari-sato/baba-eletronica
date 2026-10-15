import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface ConfirmationActionsProps {
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmationActions({
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}: ConfirmationActionsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={onCancel}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, styles.cancelText]}>{cancelLabel}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.confirmButton]}
        onPress={onConfirm}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, styles.confirmText]}>{confirmLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
