import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddTransactionStackParamList } from "../types/types";
import AddTrasactionScreen from "../screens/AddTransactionScreen";
import TransactionCategoryScreen from "../screens/TransactionCategoryScreen";
import SelectAccountScreen from "../screens/SelectAccountScreen";

const Stack = createNativeStackNavigator<AddTransactionStackParamList>();

const AddTransactionStack: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
      })}
      initialRouteName="AddTransaction"
    >
      <Stack.Screen name="AddTransaction" component={AddTrasactionScreen} />
      <Stack.Screen
        name="TransactionCategory"
        component={TransactionCategoryScreen}
      />
      <Stack.Screen name="SelectAccount" component={SelectAccountScreen} />
    </Stack.Navigator>
  );
};

export default AddTransactionStack;
