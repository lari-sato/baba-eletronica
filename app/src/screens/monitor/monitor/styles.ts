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

  cardArea: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30,
  },

  card: {
    width: "80%",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    gap: 16,
  },

  mainStatus: {
    fontSize: 20,
    color: "#454545",
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
    lineHeight: 26,
  },

  detailStatus: {
    fontSize: 17,
    color: "#696969",
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
    lineHeight: 22,
  },

  error: {
    color: "#c92023",
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
  },
});