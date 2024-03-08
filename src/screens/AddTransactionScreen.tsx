import { FC, useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useAppDispatch } from "../store/hooks";
import { NavigationOnlyProps } from "../types/interfaces";
import { reduceBalance } from "../store/store";
import Card from "../components/Card";

const AddTrasactionScreen: FC<NavigationOnlyProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState<string>("");

  const handleAddExpense = () => {
    let expense = 0;
    if (amount !== "") {
      expense = Number(amount);
    }
    dispatch(reduceBalance(expense));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="INR"
        value={amount}
        keyboardType="numeric"
        onChangeText={(text) => setAmount(text)}
      />
      <Card onPress={() => navigation.navigate("TransactionCategory")} />
      <Button onPress={handleAddExpense}>Add Expense</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddTrasactionScreen;
