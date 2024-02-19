import { useMemo, forwardRef, ForwardRefRenderFunction, Ref } from 'react';
import { View, StyleSheet, Button , Text} from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';


export const AddTransaction: ForwardRefRenderFunction<BottomSheetModalMethods> = (props, ref: Ref<BottomSheetModalMethods>) => {
  const snapPoints = useMemo(() => ["85%"], []);

  return (
    <View style={styles.container}>
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        enableDismissOnClose={true}
        enableDynamicSizing={false}
      >
        <Text style={{color: "black"}}>YOoooooo</Text>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

export default forwardRef(AddTransaction);