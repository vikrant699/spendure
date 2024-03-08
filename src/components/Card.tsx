import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text, TouchableRipple } from "react-native-paper";

interface Props {
  onPress: () => void;
  amount?: number;
}

const Card: FC<Props> = ({ onPress, amount = 0 }) => {
  return (
    <View style={styles.wrapper}>
      <TouchableRipple onPress={onPress}>
        <Surface style={styles.surface} elevation={4}>
          <Text>Amount</Text>
          <Text>{amount}</Text>
        </Surface>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
    borderRadius: 15,
  },
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Card;
