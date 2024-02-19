import { FC, useCallback, createRef} from "react";
import { View, Platform, StyleSheet } from "react-native";
import { MD3DarkTheme, TouchableRipple } from "react-native-paper";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import AddTransaction from "../screens/AddTransaction";

const AddTransactionButton: FC = () => {
    const bottomSheetModalRef = createRef<BottomSheetModalMethods>();

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <AddTransaction ref={bottomSheetModalRef}/>
      <View style={styles.container}>
        <TouchableRipple onPress={handlePresentModalPress}>
          <MaterialIcon
            name="add-circle"
            size={50}
            color={MD3DarkTheme.colors.primary}
          />
        </TouchableRipple>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 99,
    bottom: Platform.OS === "ios" ? 55 : 18,
    alignSelf: "center",
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
    borderRadius: 100,
  },
});

export default AddTransactionButton;
