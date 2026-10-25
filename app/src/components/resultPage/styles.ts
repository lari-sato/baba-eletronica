
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: "100%",
  },

  headerOffset: {
    width: "100%",
    transform: [{ translateY: -70 }],
    marginBottom: -60,
  },

  scroll: {
    flex: 1,
    width: "100%",
  },

  content: {
    alignItems: "center",
    paddingBottom: 24,
  },

  circle: {
    width: 200,
    height: 200,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  disclaimerText: {
    fontSize: 15,
    color: "#2D2D2D",
    opacity: 0.85,
    textAlign: "center",
    paddingHorizontal: 28,
    marginTop: 20,
    marginBottom: 50,
    fontFamily: "Poppins_500Medium",
    lineHeight: 19,
  },

  card: {
    width: "85%",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  message: {
    fontSize: 21,
    color: "#696969",
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
    lineHeight: 27,
  },

  result: {
    fontSize: 28,
    color: "#2c2a2c",
    fontFamily: "Poppins_700Bold",
    marginTop: 10,
    textAlign: "center",
    lineHeight: 34,
  },

  buttonArea: {
    width: "100%",
    alignItems: "center",
    marginTop: 28,
    marginBottom: 16,
  },
});
