import { FC, useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, LogBox } from "react-native";
import { MD3DarkTheme } from "react-native-paper";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/routers";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import iconsMap from "react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json";
import { AddTransactionStackParamList } from "../../typesAndInterfaces/types";
import SelectItems from "../../components/SelectItems";

interface Item {
  id: string;
  name: string;
  subCategories?: Item[];
  [key: string]: any;
}

interface Props {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: RouteProp<AddTransactionStackParamList, "SelectItem">;
}

const SelectItemsScreen: FC<Props> = ({ navigation, route }) => {
  // Ignore warning of passing function into route params
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state.",
  ]);

  const hasIcon = (iconName?: string): boolean => {
    if (iconName) {
      return Object.prototype.hasOwnProperty.call(iconsMap, iconName);
    }
    return false;
  };

  const { items, onSelect, screenNumber, itemIcon } = route.params;
  const typedItems = items as Item[];

  const handleSelection = (selection: Record<string, any>): void => {
    if (selection?.subCategories && selection?.subCategories.length > 0) {
      navigation.push("SelectItem", {
        title: selection.name,
        items: selection.subCategories,
        itemIcon,
        screenNumber: screenNumber + 1,
        onSelect: (selectedItem: Record<string, any>) => {
          onSelect(selectedItem);
          navigation.pop(screenNumber + 1);
        },
      });
    } else {
      onSelect(selection);
      navigation.goBack();
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <View style={styles.selectionContainer}>
        {typedItems.map((item) => (
          <SelectItems
            titleTextStyle={styles.itemTitleTextStyle}
            key={item.id}
            hasNestedItems={
              item?.subCategories && item?.subCategories.length > 0
            }
            icon={
              hasIcon(item.icon) ? (
                <MaterialCommunityIcon
                  name={item.icon || itemIcon}
                  size={30}
                  color={item.color || MD3DarkTheme.colors.primary}
                />
              ) : (
                <MaterialIcon
                  name={item.icon || itemIcon}
                  size={30}
                  color={item.color || MD3DarkTheme.colors.primary}
                />
              )
            }
            onPress={() => handleSelection(item)}
            title={item.name}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  contentContainerStyle: {
    paddingBottom: 50,
  },
  selectionContainer: { borderRadius: 10, overflow: "hidden" },
  itemTitleTextStyle: {
    paddingLeft: 20,
  },
});

export default SelectItemsScreen;
