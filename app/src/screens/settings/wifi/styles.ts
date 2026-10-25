import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BFDDF3",
  },

  content: {
    flex: 1,
    width: "100%",
  },

  backButtonWrapper: {
    position: "absolute",
    top: 45,
    zIndex: 10,
  },

  stepContainer: {
    width: "88%",
    maxWidth: 390,
    alignSelf: "center",
    backgroundColor: "#E4F2FC",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    gap: 8,
  },

  stepTitle: {
    fontSize: 17,
    lineHeight: 24,
    fontFamily: "Poppins_700Bold",
    color: "#2362a8",
  },

  stepDescription: {
    fontSize: 14,
    lineHeight: 21,
    color: "#454545",
    fontFamily: "Poppins_500Medium",
    marginBottom: 5,
  },

  settingsButton: {
    backgroundColor: "transparent",
    width: "100%",
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#8FB2CA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  settingsButtonText: {
    flexShrink: 1,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Poppins_600SemiBold",
    color: "#2362a8",
    textAlign: "center",
  },

  hint: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "Poppins_500Medium",
    color: "#696969",
    marginTop: 3,
    marginBottom: 4,
  },

  input: {
    width: "100%",
    height: 46,
    backgroundColor: "#F6F6F6",
    borderRadius: 14,
    paddingHorizontal: 15,
    color: "#454545",
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    marginBottom: 2,
    borderWidth: 1,
    borderColor: "transparent",
  },

  inputFocused: {
    borderColor: "#2362a8",
    borderWidth: 1,
  },

  passwordContainer: {
    width: "100%",
    height: 46,
    backgroundColor: "#F6F6F6",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: "transparent",
  },

  passwordInput: {
    flex: 1,
    height: "100%",
    color: "#454545",
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },

  eyeIcon: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    alignSelf: "center",
    backgroundColor: "#2362a8",
    minHeight: 46,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    marginTop: 3,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
  },
});
