import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  nav: {
    width: "100%",
    height: 82,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,

    paddingTop: 6,
    paddingBottom: 22,
    paddingHorizontal: 22,

    elevation: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  navText: {
    fontSize: 11,
    marginTop: 4,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
});