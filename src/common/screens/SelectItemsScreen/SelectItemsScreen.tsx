import React, { FC } from "react";
import { View, StyleSheet, LogBox } from "react-native";
import { MD3DarkTheme } from "react-native-paper";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/routers";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { AddTransactionStackParamList } from "../../types";
import { useAppDispatch } from "../../../store/hooks";
import SelectItems from "../../components/SelectItems";

interface Props {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: RouteProp<AddTransactionStackParamList, "SelectItem">;
}

const SelectAccountScreen: FC<Props> = ({ navigation, route }) => {
  // Ignore warning of passing function into route params
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  const { items, onSelect } = route.params;

  const hasNestedItems = (item: any): boolean => {
    return Object.values(item).some(
      (value) => typeof value === "object" && value !== null
    );
  };

  const handleSelection = (
    selection: Record<string, any>,
    nestedItems?: Record<string, any>
  ): void => {
    if (nestedItems) {
      // Navigate to the next screen with nested items
      navigation.navigate("SelectItem", {
        items: nestedItems,
        title: selection.name,
      });
    } else {
      onSelect(selection);
      navigation.goBack();
    }
  };

  return (
    <View style={{ padding: 10 }}>
      {items.map((item) => {
        return (
          <>
            <SelectItems
              mainContainerStyle={styles.itemMainContainerStyle}
              titleTextStyle={styles.itemTitleTextStyle}
              key={item.id}
              hasNestedItems={false}
              icon={
                <MaterialCommunityIcon
                  name="piggy-bank"
                  size={30}
                  color={MD3DarkTheme.colors.primary}
                />
              }
              onPress={() => handleSelection(item)}
              title={item.name}
              itemName="Select account"
            />
          </>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  itemMainContainerStyle: {
    marginVertical: 5,
    paddingHorizontal: 30,
    justifyContent: "flex-start",
  },
  itemTitleTextStyle: {
    paddingLeft: 20,
  },
});

export default SelectAccountScreen;
