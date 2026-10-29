
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9DDE5",
    alignItems: "center",
    paddingTop: 45,
    paddingBottom: 0,
  },

  backButtonWrapper: {
    position: "absolute",
    top: 45,
    left: 0,
    zIndex: 10,
  },

  mainContent: {
    flex: 1,
    width: "100%",
  },

  scroll: {
    flex: 1,
    width: "100%",
  },

  content: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 30,
  },

  circle: {
    width: 180,
    height: 180,
    backgroundColor: "#F6F6F6",
    borderRadius: 90,
    borderWidth: 5,
    borderColor: "#E8A6B8",
    alignItems: "center",
    justifyContent: "center",
  },

  disclaimer: {
    fontSize: 14,
    color: "#2D2D2D",
    opacity: 0.85,
    fontFamily: "Poppins_500Medium",
    lineHeight: 19,
    textAlign: "center",
    paddingHorizontal: 28,
    marginTop: 12,
    marginBottom: 39,
  },

  card: {
    width: "80%",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    gap: 14,
  },

  option: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 16,
    alignItems: "center",
  },

  percentage: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    color: "#454545",
  },

  result: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#454545",
    textAlign: "center",
  },
});
