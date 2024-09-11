import { StyleSheet } from "react-native";
import { isIos } from "../../common/constants/constants";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: isIos ? 40 : 10,
    display: "flex",
    width: "100%",
    height: "100%",
  },
  segmentedButtonsContainer: {
    marginVertical: 20,
  },
  inputContainer: {
    marginVertical: 20,
  },
  selectionContainer: {
    marginVertical: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  addTransactionButtonContainer: {
    marginVertical: 20,
  },
});

export default styles;
