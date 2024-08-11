import { FC, useState } from "react";
import { Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";

import { NavigationOnlyProps } from "../common/interfaces";
import { useAppDispatch } from "../store/hooks";
import { signOut } from "../store/slices/authSlice";

const Settings: FC<NavigationOnlyProps> = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    setLoading(true);
    setError(null);
    const resultAction = await dispatch(signOut(navigation));
    if (signOut.rejected.match(resultAction)) {
      setError(resultAction.payload as string);
    }
    setLoading(false);
  };

  return (
    <View style={[styles.verticallySpaced, styles.mt20]}>
      <Button disabled={loading} onPress={handleSignOut}>
        Sign Out
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});

export default Settings;
