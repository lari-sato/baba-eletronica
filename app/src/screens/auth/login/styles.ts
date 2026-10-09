import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C9E4F7",
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
  },

  input: {
    width: "80%",
    height: 55,
    backgroundColor: "#F6F6F6",
    borderRadius: 28,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#454545",
    borderWidth: 2,
    borderColor: "transparent",
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
    borderWidth: 2,
    borderColor: "transparent",
  },
  inputFocused: {
    borderColor: "#407888",
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#454545",
    padding: 0,
    margin: 0,
  },
  eyeIcon: {
    paddingLeft: 10,
  },
  forgotPasswordContainer: {
    width: "80%",
    marginTop: -7,
    paddingLeft: 10,
  },

  forgotPasswordText: {
    fontSize: 13,
    color: "#407888",
    fontFamily: "Poppins_600SemiBold",
    textDecorationLine: "underline",
    textDecorationColor: "#407888",
  },
  button: {
    backgroundColor: "#407888",
    width: "60%",
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "#F6F6F6",
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
});
