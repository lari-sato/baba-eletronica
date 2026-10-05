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
    fontSize: 14,
    color: "#454545",
    fontWeight: "600",
  },
  result: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
  },
  hour: {
    fontSize: 11,
    color: "#888888",
    marginTop: 4,
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
});
