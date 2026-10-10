import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C9E4F7",
    paddingTop: 45,
    paddingBottom: 0,
  },

  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 35,
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    fontFamily: "Poppins_700Bold",
    color: "#696969",
  },

  logoutText: {
    color: "#b63b3b",
    fontFamily: "Poppins_700Bold",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "#0000008e",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "70%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 22,
    alignItems: "center",
    position: "relative",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },

  modalText: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: "#2D2D2D",
    marginBottom: 20,
    textAlign: "center",
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
    backgroundColor: "#b63b3b",
  },

  cancelText: {
    color: "#2D2D2D",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
  },

  confirmText: {
    color: "#FFFFFF",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },
});