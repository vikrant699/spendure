import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { ParamListBase } from "@react-navigation/routers";
import { AddTransactionStackParamList } from "./types";

// For components with only navigation prop
export interface NavigationOnlyProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

export interface SelectAccountScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: RouteProp<AddTransactionStackParamList, "SelectAccount">;
}
