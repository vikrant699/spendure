import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/routers";

// For components with only navigation prop
export interface NavigationOnlyProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
