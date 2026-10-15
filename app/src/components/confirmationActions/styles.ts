import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    minWidth: 0,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: "#E0E0E0",
  },
  confirmButton: {
    backgroundColor: "#b63b3b",
  },
  buttonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    textAlign: "center",
  },
  cancelText: {
    color: "#2D2D2D",
  },
  confirmText: {
    color: "#FFFFFF",
  },
});
