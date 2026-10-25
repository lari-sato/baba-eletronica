import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BFDDF3",
    paddingTop: 45,
  },

  content: {
    flex: 1,
  },

  cardArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 22,
  },

  card: {
    width: "90%",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    gap: 10,
  },

  mainStatus: {
    fontSize: 20,
    color: "#454545",
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
    lineHeight: 26,
  },

  detailStatus: {
    fontSize: 16,
    color: "#696969",
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
    lineHeight: 22,
  },

  error: {
    color: "#C92023",
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
  },
});
