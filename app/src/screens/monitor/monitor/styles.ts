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
    fontSize: 26,
    fontWeight: "bold",
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

  status: {
    fontSize: 18,
    color: "#454545",
    textAlign: "center",
    fontWeight: "600",
  },

  error: {
    color: "#c92023",
    fontSize: 14,
    textAlign: "center",
  },
});
