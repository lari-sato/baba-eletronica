import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C9E4F7",
    paddingTop: 45,
    paddingBottom: 20,
  },

  title: {
    fontSize: 23,
    color: "#407888",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -30,
  },

  divider: {
    height: 2,
    backgroundColor: "#8FB2CA",
    width: "88%",
    alignSelf: "center",
    marginTop: 4,
    marginBottom: 15,
  },

  scroll: {
    flex: 1,
    width: "100%",
  },

  scrollContent: {
    paddingBottom: 15,
    alignItems: "center",
  },
});
