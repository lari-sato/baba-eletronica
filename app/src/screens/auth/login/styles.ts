import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C9E4F7",
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
  },
  forgotPassword: {
    width: "80%",
    fontSize: 12,
    color: "#407888",
    fontWeight: "500",
    marginTop: -7,
    paddingLeft: 10,
  },
  input: {
  width: "80%",
  height: 55,
  backgroundColor: "#F6F6F6",
  borderRadius: 28,
  paddingHorizontal: 20,
  fontSize: 16,
  fontWeight: "600",
  color: "#454545",
  },

  passwordContainer: {
  width: "80%",
  height: 55,
  backgroundColor: "#F6F6F6",
  borderRadius: 28,
  paddingHorizontal: 20,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  },

  passwordInput: {
  flex: 1,
  height: "100%",
  fontSize: 16,
  fontWeight: "600",
  color: "#454545",
  padding: 0,
  margin: 0,
  },
  eyeIcon: {
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "#407888",
    width: "60%",
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#F6F6F6",
    fontSize: 16,
    fontWeight: "bold",
  },
});
