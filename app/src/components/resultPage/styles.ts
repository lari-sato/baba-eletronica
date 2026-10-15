import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  circle: {
    width: 200,
    height: 200,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -8,
  },

  disclaimerText: {
    fontSize: 14,
    color: "#2D2D2D",
    opacity: 0.85,
    textAlign: "center",
    paddingHorizontal: 28,
    marginTop: -4,
    marginBottom: 10,
    fontFamily: "Poppins_500Medium",
    lineHeight: 19,
  },

  card: {
    width: "80%",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  message: {
    fontSize: 20,
    color: "#696969",
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
    lineHeight: 26,
  },

  result: {
    fontSize: 26,
    color: "#2c2a2c",
    fontFamily: "Poppins_700Bold",
    marginTop: 6,
    textAlign: "center",
    lineHeight: 32,
  },
});