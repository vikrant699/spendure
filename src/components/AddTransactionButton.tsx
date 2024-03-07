import { FC } from "react";
import { View, Platform, StyleSheet } from "react-native";
import { MD3DarkTheme, TouchableRipple } from "react-native-paper";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../types/types";

type homeScreenProp = NativeStackNavigationProp<HomeStackParamList>;

const AddTransactionButton: FC = () => {
  const navigation = useNavigation<homeScreenProp>();

  return (
    <>
      <View style={styles.container}>
        <TouchableRipple
          onPress={() => navigation.navigate("AddTransactionStack")}
        >
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
