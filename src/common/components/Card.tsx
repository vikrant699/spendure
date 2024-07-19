import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text, TouchableRipple } from "react-native-paper";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { width, height } from "../../utils/constants";

interface Props {
  onPress: () => void;
  name?: string;
  balance?: number;
  addAccount: boolean;
}

const Card: FC<Props> = ({
  onPress,
  name = "Account 1",
  balance = 0,
  addAccount,
}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableRipple onPress={onPress}>
        <Surface style={styles.surface} elevation={4}>
          {!addAccount && (
            <>
              <Text>{name}</Text>
              <Text>{balance}</Text>
            </>
          )}
          {addAccount && <MaterialIcon name="add-circle" size={50} />}
        </Surface>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
    borderRadius: 15,
    width: width / 2.5,
    marginVertical: 10,
  },
  surface: {
    padding: 8,
    height: height / 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Card;
