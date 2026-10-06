import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width: "100%",
  },
  header: {
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 29,
    color: "#373737",
    fontFamily: "Poppins_700Bold",
  },
  subtitle: {
    fontSize: 23,
    color: "#414141",
    fontFamily: "Poppins_600SemiBold",
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
    width: "75%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    fontSize: 23,
    color: "#454545",
    fontFamily: "Poppins_600SemiBold",
  },
  result: {
    fontSize: 30,
    color: "#2c2a2c",
    fontFamily: "Poppins_900Black",
    marginTop: 6,
  },
  disclaimerText: {
    fontSize: 14,
    color: "#111111",
    opacity: 0.8,
    textAlign: "center",
    paddingHorizontal: 25,
    marginTop: -2,
    marginBottom: -5,
    fontFamily: "Nunito_700Bold",
  },
});
