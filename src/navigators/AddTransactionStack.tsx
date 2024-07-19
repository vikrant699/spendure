import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddTransactionStackParamList } from "../common/types";
import AddTrasactionScreen from "../screens/AddTransaction/AddTransactionScreen";
import TransactionCategoryScreen from "../screens/TransactionCategoryScreen";
import SelectItemsScreen from "../common/screens/SelectItemsScreen/SelectItemsScreen";

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
      <Stack.Screen
        name="SelectItem"
        component={SelectItemsScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
};

export default AddTransactionStack;
