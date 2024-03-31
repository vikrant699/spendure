import { FC } from "react";
import { View } from "react-native";
import { Text, Surface, TouchableRipple, MD3Colors } from "react-native-paper";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

interface Props {
  onPress: () => void;
  title: string;
  selection: boolean;
  selectedItemName: string | undefined;
  defaultName: string;
}

const SelectItems: FC<Props> = ({
  onPress,
  title,
  selection,
  selectedItemName,
  defaultName,
}) => {
  return (
    <TouchableRipple onPress={onPress}>
      <Surface
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text>{title}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ color: MD3Colors.secondary60, marginRight: 4 }}>
            {selection ? selectedItemName : defaultName}
          </Text>
          <MaterialIcon
            name="chevron-right"
            size={20}
            color={MD3Colors.secondary60}
          />
        </View>
      </Surface>
    </TouchableRipple>
  );
};

export default SelectItems;
