import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C9E4F7",
    paddingTop: 45,
    paddingBottom: 0,
  },

  backButtonWrapper: {
    position: "absolute",
    top: 45,
    zIndex: 10,
  },

  content: {
    flex: 1,
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