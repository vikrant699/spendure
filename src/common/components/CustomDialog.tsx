import { useState, forwardRef, useImperativeHandle } from "react";
import { Dialog, Portal, Button, Text } from "react-native-paper";

export interface CustomDialogHandles {
  showDialog: (title: string, message: string) => void;
  hideDialog: () => void;
}

const CustomDialog = forwardRef((props, ref) => {
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useImperativeHandle(ref, () => ({
    showDialog: (title: string, message: string) => {
      setTitle(title);
      setMessage(message);
      setDialogVisible(true);
    },
    hideDialog: () => {
      setDialogVisible(false);
    },
  }));

  return (
    <Portal>
      <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text>{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setDialogVisible(false)}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

export default CustomDialog;
