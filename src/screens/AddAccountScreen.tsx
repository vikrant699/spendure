import { useState } from "react";
import { View } from "react-native";
import { TextInput, Button, SegmentedButtons } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../store/hooks";
import { addAccount } from "../store/store";
import { RootStackParamList } from "../common/types";

const AddAccountScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [accountName, setAccountName] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);

  const dispatch = useAppDispatch();

  const handleAddAccount = () => {
    dispatch(addAccount({ name: accountName, balance }));
    navigation.goBack();
  };

  return (
    <View>
      <TextInput
        autoFocus={true}
        label="Account name..."
        //   value={amount}
        keyboardAppearance="dark"
        onChangeText={(text) => setAccountName(text)}
      />
      <TextInput
        label="Account balance..."
        inputMode="decimal"
        //   value={amount}
        keyboardType="numeric"
        keyboardAppearance="dark"
        onChangeText={(text) => setBalance(Number(text))}
      />
      <Button onPress={handleAddAccount}>Add Account</Button>
    </View>
  );
};

export default AddAccountScreen;
