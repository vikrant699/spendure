import { FC } from "react";
import { Text, Button } from "react-native-paper";
import { NavigationOnlyProps } from "../types/interfaces";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { updateSelectedAccountId } from "../store/store";

const SelectAccountScreen: FC<NavigationOnlyProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((state) => state.accounts);

  const handleSelection = (id: string | number) => {
    dispatch(updateSelectedAccountId(id));
    navigation.goBack();
  };

  return (
    <>
      {Object.values(accounts).map((account) => (
        <Button
          key={account.accountId}
          mode="contained"
          onPress={() => handleSelection(account.accountId)}
        >
          {account.accountName}
        </Button>
      ))}
    </>
  );
};

export default SelectAccountScreen;
