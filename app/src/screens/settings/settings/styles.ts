import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C9E4F7",
    paddingTop: 45,
    paddingBottom: 20,
  },

  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 35,
  },

  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#407888",
    marginBottom: 5,
  },

  divider: {
    height: 2,
    backgroundColor: "#8FB2CA",
    width: "88%",
    marginBottom: 30,
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
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },

  modalText: {
    fontSize: 18,
    fontWeight: "bold",
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
