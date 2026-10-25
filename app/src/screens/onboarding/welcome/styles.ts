
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BFDDF3",
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    alignItems: "center",
    paddingTop: 45,
    paddingBottom: 20,
  },

  stepContainer: {
    width: "88%",
    maxWidth: 390,
    backgroundColor: "#E4F2FC",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    gap: 8,
  },

  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 4,
  },

  stepNumber: {
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: "#2362a8",
    alignItems: "center",
    justifyContent: "center",
  },

  stepNumberText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },

  stepTitle: {
    flex: 1,
    fontSize: 17,
    lineHeight: 24,
    fontFamily: "Poppins_700Bold",
    color: "#2362a8",
    marginBottom: 0,
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
  },

  passwordInput: {
    flex: 1,
    height: "100%",
    color: "#454545",
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },

  connectButton: {
    alignSelf: "center",
    backgroundColor: "#2362a8",
    minHeight: 46,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    marginTop: 3,
  },

  footer: {
    width: "100%",
    backgroundColor: "#BFDDF3",
    borderTopWidth: 1,
    borderTopColor: "#8FB2CA",
    paddingTop: 14,
    paddingBottom: 24,
    paddingHorizontal: 24,
    alignItems: "center",
    gap: 12,
  },

  confirmRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: "100%",
    maxWidth: 390,
    minHeight: 42,
  },
  confirmText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Poppins_500Medium",
    color: "#454545",
  },

  readyButton: {
    backgroundColor: "#2362a8",
    minHeight: 50,
    width: "80%",
    maxWidth: 390,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  buttonDisabled: {
    opacity: 0.45,
  },
  
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
  },
});
