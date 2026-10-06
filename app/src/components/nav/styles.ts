import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  nav: {
    width: "45%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 20,
    elevation: 6,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    fontSize: 14,
    color: "#696969",
    marginTop: 4,
    fontFamily: "Poppins_600SemiBold",
  },
});
