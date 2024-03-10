import { FC, useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  Pressable,
  Platform,
} from "react-native";
import { TextInput, Button, SegmentedButtons } from "react-native-paper";
import { useHeaderHeight } from "@react-navigation/elements";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { NavigationOnlyProps } from "../types/interfaces";
import { reduceBalance, addBalance } from "../store/store";

const AddTrasactionScreen: FC<NavigationOnlyProps> = ({ navigation }) => {
  const selectedAccountId = useAppSelector(
    (state) => state.appState.selectedAccountId
  );
  const accounts = useAppSelector((state) => state.accounts);
  const dispatch = useAppDispatch();
  const headerHeight = useHeaderHeight();
  const [amount, setAmount] = useState<string>("");
  const [transactionType, setTransactionType] = useState<string>("expense");

  const handleAddTransaction = () => {
    let finalAmount = 0;
    if (amount !== "") {
      finalAmount = Number(amount);
    }

    if (transactionType === "transfer") {
      // pass
    } else if (transactionType === "income") {
      dispatch(
        addBalance({ accountId: selectedAccountId, amount: finalAmount })
      );
    } else {
      dispatch(
        reduceBalance({ accountId: selectedAccountId, amount: finalAmount })
      );
    }
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={headerHeight}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Pressable style={styles.innerContainer} onPress={Keyboard.dismiss}>
        <SegmentedButtons
          value={transactionType}
          onValueChange={setTransactionType}
          buttons={[
            {
              value: "expense",
              label: "Expense",
            },
            {
              value: "income",
              label: "Income",
            },
            { value: "transfer", label: "Transfer" },
          ]}
        />
        <TextInput
          autoFocus={true}
          label={
            transactionType === "transfer"
              ? "INR"
              : transactionType === "income"
              ? "INR++"
              : "INR--"
          }
          inputMode="decimal"
          value={amount}
          keyboardType="numeric"
          onChangeText={(text) => setAmount(text)}
          keyboardAppearance="dark"
        />
        <Button
          mode="contained"
          onPress={() => navigation.navigate("SelectAccount")}
        >
          {accounts[selectedAccountId].accountName}
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("TransactionCategory")}
        >
          Transaction Category
        </Button>
        <Button
          disabled={amount === "" ? true : false}
          mode="contained"
          onPress={handleAddTransaction}
        >
          Add Transaction
        </Button>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  innerContainer: {
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: Platform.OS === "ios" ? 40 : 10,
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
});

export default AddTrasactionScreen;
