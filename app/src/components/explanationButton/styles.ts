import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  infoButton: {
    width: "30%",
    height: 54,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -4,
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    borderWidth: 2.5,
    borderColor: "#F6F6F6",
    gap: 1,
  },

  infoButtonText: {
    fontSize: 13,
    color: "#F6F6F6",
    marginTop: -4,
    fontFamily: "Poppins_600SemiBold",
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
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 25,
    alignItems: "center",
    position: "relative",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
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
    fontSize: 22,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 15,
    textAlign: "center",
    paddingHorizontal: 10,
  },

  modalText: {
    fontSize: 16,
    color: "#696969",
    textAlign: "center",
    lineHeight: 24,
    width: "100%",
    fontFamily: "Poppins_500Medium",
  },
});