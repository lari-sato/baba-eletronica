import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BFDDF3",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 70,
    paddingBottom: 30,
  },

  title: {
    fontSize: 25,
    fontFamily: "Poppins_700Bold",
    color: "#407888",
  },

  card: {
    width: "80%",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    gap: 20,
  },

  mainStatus: {
  fontSize: 23,
  color: "#454545",
  textAlign: "center",
  fontFamily: "Poppins_600SemiBold"
  },

  detailStatus: {
    fontSize: 17,
    color: "#696969",
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
    lineHeight: 20,
  },
  
  error: {
    color: "#c92023",
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
  },
});
