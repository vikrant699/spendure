import { FC, useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  Pressable,
  Platform,
  View,
} from "react-native";
import {
  Text,
  Surface,
  TextInput,
  Button,
  SegmentedButtons,
  TouchableRipple,
  MD3Colors,
} from "react-native-paper";
import { useHeaderHeight } from "@react-navigation/elements";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { NavigationOnlyProps } from "../../types/interfaces";
import {
  reduceBalance,
  addBalance,
  updateTransferAccountId,
} from "../../store/store";
import SelectItems from "./SelectItems";

const AddTrasactionScreen: FC<NavigationOnlyProps> = ({ navigation }) => {
  const selectedAccountId = Number(
    useAppSelector((state) => state.appState.selectedAccountId)
  );
  const transferAccountId = Number(
    useAppSelector((state) => state.appState.transferAccountId)
  );
  const accounts = useAppSelector((state) => state.accounts);
  const dispatch = useAppDispatch();
  const headerHeight = useHeaderHeight();
  const [amount, setAmount] = useState<string>("");
  const [transactionType, setTransactionType] = useState<string>("expense");

  const handleAddTransaction = (): void => {
    let finalAmount = 0;
    if (amount !== "") {
      finalAmount = Number(amount);
    }

    if (transactionType === "transfer") {
      dispatch(
        reduceBalance({
          accountId: selectedAccountId,
          amount: finalAmount,
        })
      );
      dispatch(
        addBalance({
          accountId: transferAccountId,
          amount: finalAmount,
        })
      );
    } else if (transactionType === "income") {
      dispatch(
        addBalance({
          accountId: selectedAccountId,
          amount: finalAmount,
        })
      );
    } else {
      dispatch(
        reduceBalance({
          accountId: selectedAccountId,
          amount: finalAmount,
        })
      );
    }
    navigation.goBack();
  };

  useEffect(() => {
    if (selectedAccountId === transferAccountId) {
      dispatch(updateTransferAccountId(0));
    }
  }, [selectedAccountId]);

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
        <SelectItems
          onPress={() =>
            navigation.navigate("SelectAccount", { toAccount: false })
          }
          title="Account"
          selection={selectedAccountId !== 0}
          selectedItemName={accounts[selectedAccountId]?.accountName}
          defaultName="Select account"
        />
        {transactionType === "transfer" && (
          <SelectItems
            onPress={() =>
              navigation.navigate("SelectAccount", { toAccount: true })
            }
            title="To account"
            selection={transferAccountId !== 0}
            selectedItemName={accounts[transferAccountId]?.accountName}
            defaultName="Select account"
          />
        )}
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
