import { FC, useState, useEffect } from "react";
import { Keyboard, Pressable, View } from "react-native";
import { TextInput, Button, SegmentedButtons } from "react-native-paper";

import DateSelector from "./components/DateSelector/DateSelector";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { NavigationOnlyProps } from "../../common/typesAndInterfaces/interfaces";
import {
  reduceBalance,
  addBalance,
  updateSelectedAccountId,
  updateTransferAccountId,
} from "../../store/store";
8;
import SelectItems from "../../common/components/SelectItems";
import { transactionCategories } from "../../common/constants/constants";
import styles from "./AddTransaction.styles";

const AddTrasaction: FC<NavigationOnlyProps> = ({ navigation }) => {
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

  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState<string>("");
  const [transactionType, setTransactionType] = useState<string>("expense");
  const [transactionCategory, setTransactionCategory] =
    useState<string>("Select Category");

  const now = new Date();
  const defaultTime = {
    hours: now.getHours(),
    minutes: now.getMinutes(),
  };

  const [androidDate, setAndroidDate] = useState<Date>(new Date());
  const [androidTime, setAndroidTime] = useState<{
    hours: number;
    minutes: number;
  }>(defaultTime);

  const [finalDateTime, setFinalDateTime] = useState<Date>(new Date());

  const disableButton =
    amount === "" || selectedAccountId === "" ? true : false;

  function addHoursAndMinutes(date: Date, hours: number, minutes: number) {
    const newDate = new Date(date.getTime());
    newDate.setHours(date.getHours() + hours);
    newDate.setMinutes(date.getMinutes() + minutes);
    return newDate;
  }

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
          transaction: {
            // to do
          },
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

  const onAndroidDateChange = (date?: Date) => {
    if (date) {
      setAndroidDate(date);
    }
  };

  const onAndroidTimeChange = (params: { hours: number; minutes: number }) => {
    setAndroidTime(params);
  };

  const onIosDateChange = (date: Date) => {
    setFinalDateTime(date);
  };

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <View style={styles.segmentedButtonsContainer}>
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
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          autoFocus={amount === "" ? true : false}
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
      </View>
      <View style={styles.selectionContainer}>
        <SelectItems
          hasNestedItems={true}
          onPress={() =>
            navigation.navigate("SelectItem", {
              title: "Select Account",
              screenNumber: 0,
              itemIcon: "piggy-bank",
              items: unselectedAccounts,
              onSelect: (selectedItem: Record<string, any>) => {
                dispatch(updateSelectedAccountId(selectedItem.id));
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
                screenNumber: 0,
                itemIcon: "piggy-bank",
                items: unselectedTransferAccounts,
                onSelect: (selectedItem: Record<string, any>) => {
                  dispatch(updateTransferAccountId(selectedItem.id));
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
            onPress={() => {
              navigation.navigate("SelectItem", {
                title: "Select Category",
                screenNumber: 0,
                itemIcon: "food",
                items: transactionCategories,
                onSelect: (selectedItem: Record<string, any>) => {
                  setTransactionCategory(selectedItem.name);
                },
              });
            }}
            title="Category"
            itemName={transactionCategory}
          />
        )}
        <DateSelector
          onIosChange={onIosDateChange}
          onAndroidDateChange={onAndroidDateChange}
          onAndroidTimeChange={onAndroidTimeChange}
          androidDate={androidDate}
          androidTime={androidTime}
        />
      </View>
      <View style={styles.addTransactionButtonContainer}>
        <Button
          disabled={disableButton}
          mode="contained"
          onPress={handleAddTransaction}
        >
          Add Transaction
        </Button>
      </View>
    </Pressable>
  );
};

export default AddTrasaction;
