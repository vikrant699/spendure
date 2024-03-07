import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddTrasactionScreen from "../screens/AddTransactionScreen";
import TransactionCategoryScreen from "../screens/TransactionCategoryScreen";

const Stack = createNativeStackNavigator();

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
    </Stack.Navigator>
  );
};

export default AddTransactionStack;
