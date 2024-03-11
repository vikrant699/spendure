import React, { FC } from "react";
import { Button } from "react-native-paper";
import { SelectAccountScreenProps } from "../../types/interfaces";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  updateSelectedAccountId,
  updateTransferAccountId,
} from "../../store/store";

const SelectAccountScreen: FC<SelectAccountScreenProps> = ({
  navigation,
  route,
}) => {
  const toAccount = route.params.toAccount;
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((state) => state.accounts);
  const selectedAccountId = Number(
    useAppSelector((state) => state.appState.selectedAccountId)
  );
  const transferAccountId = Number(
    useAppSelector((state) => state.appState.transferAccountId)
  );

  const handleSelection = (id: number) => {
    if (!toAccount) {
      dispatch(updateSelectedAccountId(id));
    } else {
      dispatch(updateTransferAccountId(id));
    }
    navigation.goBack();
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
