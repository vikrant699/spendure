import { StyleSheet } from "react-native";
import { width } from "../../common/constants/constants";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: width / 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
});

export default styles;
