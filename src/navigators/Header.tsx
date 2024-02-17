import React, { FC } from "react";
import { Appbar } from "react-native-paper";
import { RouteProp } from "@react-navigation/native";

interface Props {
  route: RouteProp<Record<string, object | undefined>, string>;
}

const CustomNavigationBar: FC<Props> = ({ route }) => {
  return (
    <Appbar.Header>
      <Appbar.Content title={route.name} />
    </Appbar.Header>
  );
};

export default CustomNavigationBar;
