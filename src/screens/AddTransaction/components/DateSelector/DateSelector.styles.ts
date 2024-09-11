import { StyleSheet } from "react-native";
import { MD3Colors } from "react-native-paper";

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  selectionDetailsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  selectedItemText: {
    color: MD3Colors.secondary60,
    marginRight: 4,
  },
});

export default styles;
