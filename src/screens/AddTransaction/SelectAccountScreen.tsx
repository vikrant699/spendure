import React, { FC } from "react";
import { Button } from "react-native-paper";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/routers";
import { AddTransactionStackParamList } from "../../types/types";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  updateSelectedAccountId,
  updateTransferAccountId,
} from "../../store/store";

interface Props {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: RouteProp<AddTransactionStackParamList, "SelectAccount">;
}

const SelectAccountScreen: FC<Props> = ({ navigation, route }) => {
  const toAccount = route?.params.toAccount;
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((state) => state.accounts);
  const selectedAccountId = Number(
    useAppSelector((state) => state.appState.selectedAccountId)
  );
  const transferAccountId = Number(
    useAppSelector((state) => state.appState.transferAccountId)
  );

  const handleSelection = (id: number): void => {
    if (!toAccount) {
      dispatch(updateSelectedAccountId(id));
    } else {
      dispatch(updateTransferAccountId(id));
    }
    navigation?.goBack();
  };

  return (
    <>
      {Object.values(accounts).map(
        (account) =>
          ((account.accountId !== selectedAccountId && !toAccount) ||
            (toAccount && account.accountId !== selectedAccountId)) && (
            <Button
              key={account.accountId}
              mode="contained"
              onPress={() => handleSelection(account.accountId)}
            >
              {account.accountName}
            </Button>
          )
      )}
    </>
  );
};

export default SelectAccountScreen;
