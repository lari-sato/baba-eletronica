import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    width: "100%",
  },

  circle: {
    width: 200,
    height: 200,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    width: "80%",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  message: {
    fontSize: 20,
    color: "#696969",
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },

  result: {
    fontSize: 26,
    color: "#2c2a2c",
    fontFamily: "Poppins_700Bold",
    marginTop: 6,
    textAlign: "center",
  },

  disclaimerText: {
    fontSize: 14,
    color: "#2D2D2D",
    opacity: 0.85,
    textAlign: "center",
    paddingHorizontal: 25,
    marginTop: -2,
    marginBottom: -5,
    fontFamily: "Poppins_500Medium",
    lineHeight: 19,
  },
});