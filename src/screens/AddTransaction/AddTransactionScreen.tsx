import { FC, useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  Pressable,
  Platform,
  View,
} from "react-native";
import { TextInput, Button, SegmentedButtons } from "react-native-paper";
import { useHeaderHeight } from "@react-navigation/elements";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { NavigationOnlyProps } from "../../common/interfaces";
import {
  reduceBalance,
  addBalance,
  updateSelectedAccountId,
  updateTransferAccountId,
} from "../../store/store";
import SelectItems from "../../common/components/SelectItems";

const AddTrasactionScreen: FC<NavigationOnlyProps> = ({ navigation }) => {
  const selectedAccountId = useAppSelector(
    (state) => state.appState.selectedAccountId
  );
  const transferAccountId = useAppSelector(
    (state) => state.appState.transferAccountId
  );
  const accounts = useAppSelector((state) => state.accounts);

  const unselectedAccounts = accounts.filter(
    (acc) => acc.id !== selectedAccountId
  );
  const unselectedTransferAccounts = accounts.filter(
    (acc) => acc.id !== transferAccountId && acc.id !== selectedAccountId
  );

  const selectedAccountName = accounts.find(
    (acc) => acc.id === selectedAccountId
  )?.name;
  const transferAccountName = accounts.find(
    (acc) => acc.id === transferAccountId
  )?.name;

  console.log(unselectedAccounts);
  const dispatch = useAppDispatch();
  const headerHeight = useHeaderHeight();
  const [amount, setAmount] = useState<string>("");
  const [transactionType, setTransactionType] = useState<string>("expense");

  const disableButton =
    amount === "" || selectedAccountId === "" ? true : false;

  const handleAddTransaction = (): void => {
    let finalAmount = 0;
    if (amount !== "") {
      finalAmount = Number(amount);
    }

    if (transactionType === "transfer") {
      dispatch(
        reduceBalance({
          id: selectedAccountId,
          amount: finalAmount,
        })
      );
      dispatch(
        addBalance({
          id: transferAccountId,
          amount: finalAmount,
        })
      );
      dispatch(updateTransferAccountId(""));
    } else if (transactionType === "income") {
      dispatch(
        addBalance({
          id: selectedAccountId,
          amount: finalAmount,
        })
      );
    } else {
      dispatch(
        reduceBalance({
          id: selectedAccountId,
          amount: finalAmount,
        })
      );
    }
    navigation.goBack();
  };

  useEffect(() => {
    if (selectedAccountId === transferAccountId) {
      dispatch(updateTransferAccountId(""));
    }
  }, [selectedAccountId]);

  useEffect(() => {
    if (selectedAccountId === transferAccountId) {
      dispatch(updateSelectedAccountId(""));
    }
  }, [transferAccountId]);

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
        <View>
          <SelectItems
            hasNestedItems={true}
            onPress={() =>
              navigation.navigate("SelectItem", {
                title: "Select Account",
                items: unselectedAccounts,
                onSelect: (selectedItemId: Record<string, any>) => {
                  console.log(selectedItemId);
                },
              })
            }
            title="Account"
            selectedItemName={selectedAccountName}
            itemName="Select account"
          />
          {transactionType === "transfer" && (
            <SelectItems
              hasNestedItems={true}
              onPress={() =>
                navigation.navigate("SelectItem", {
                  title: "Select Account",
                  items: unselectedTransferAccounts,
                  onSelect: (selectedItemId: Record<string, any>) => {
                    console.log(selectedItemId);
                  },
                })
              }
              title="To account"
              selectedItemName={transferAccountName}
              itemName="Select account"
            />
          )}
          {transactionType !== "transfer" && (
            <SelectItems
              hasNestedItems={true}
              onPress={() =>
                navigation.navigate("SelectItem", {
                  type: "category",
                  title: "Select Category",
                  onSelect: (selectedItemId: Record<string, any>) => {
                    console.log(selectedItemId);
                  },
                })
              }
              title="Category"
              // selectedItemName={accounts[transferAccountId]?.name}
              itemName="Select Category"
            />
          )}
        </View>
        <Button
          disabled={disableButton}
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
