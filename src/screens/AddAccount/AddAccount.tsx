import { FC, useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";

import { useAppDispatch } from "../../store/hooks";
import { addAccount } from "../../store/store";
import { NavigationOnlyProps } from "../../common/typesAndInterfaces/interfaces";

const AddAccount: FC<NavigationOnlyProps> = ({ navigation }) => {
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

export default AddAccount;
