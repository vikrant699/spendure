import { FC } from "react";
import { Appbar } from "react-native-paper";

const CustomNavigationBar: FC = (props) => {
  const { route } = props;

  return (
    <Appbar.Header>
      <Appbar.Content title={route.name} />
    </Appbar.Header>
  );
};

export default CustomNavigationBar;
