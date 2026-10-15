import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardContent: {
    flex: 1,
  },
  message: {
    fontSize: 15,
    color: "#4e4c4c",
    fontFamily: "Poppins_700Bold",
  },
  result: {
    fontSize: 13,
    color: "#666666",
    marginTop: 1,
    fontFamily: "Poppins_600SemiBold",
  },
  hour: {
    fontSize: 11,
    color: "#777777",
    marginTop: 4,
    fontFamily: "Poppins_600SemiBold",
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
});
