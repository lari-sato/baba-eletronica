
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C9E4F7",
    paddingTop: 45,
    paddingBottom: 0,
  },

  backButtonWrapper: {
    position: "absolute",
    top: 45,
    left: 0,
    zIndex: 10,
  },

  content: {
    flex: 1,
  },

  menuContainer: {
    width: "100%",
    gap: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },

  iconContainer: {
    width: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  optionButton: {
    width: "90%",
    height: 55,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
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
    gap: 6,
  },

  optionText: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: "#696969",
    includeFontPadding: false,
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
    width: "85%",
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
});
