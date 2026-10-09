import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BFDDF3",
    paddingTop: 45,
    paddingBottom: 0,
  },

  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 35,
  },

  stepContainer: {
    width: "80%",
    alignItems: "center",
    marginBottom: 32,
  },

  stepTitle: {
    fontSize: 17,
    fontFamily: "Poppins_700Bold",
    color: "#407888",
    alignSelf: "flex-start",
    marginBottom: 7,
  },

  stepDescription: {
    fontSize: 14,
    color: "#454545",
    alignSelf: "flex-start",
    marginBottom: 13,
    textAlign: "left",
    fontFamily: "Poppins_600SemiBold",
  },

  settingsButton: {
    backgroundColor: "#C9E4F7",
    width: "100%",
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    gap: 8,
  },

  settingsButtonText: {
    color: "#407888",
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
  },

  input: {
    width: "100%",
    height: 45,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },

  passwordContainer: {
    width: "100%",
    height: 45,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },

  inputFocused: {
    borderColor: "#407888",
  },

  passwordInput: {
    flex: 1,
    height: "100%",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    padding: 0,
    margin: 0,
  },

  eyeIcon: {
    paddingLeft: 10,
  },

  button: {
    backgroundColor: "#407888",
    width: "80%",
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  buttonText: {
    color: "#F6F6F6",
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  modalContent: {
    width: "50%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 22,
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
    top: 15,
    right: 15,
    padding: 5,
    zIndex: 1,
  },

  iconSuccess: {
    marginTop: -10,
    marginBottom: -2,
  },

  modalTitle: {
    fontSize: 20,
    color: "#407888",
    marginBottom: 8,
    fontFamily: "Poppins_600SemiBold",
  },

  modalText: {
    fontSize: 16,
    color: "#696969",
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },
});