import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Dialog, Portal, Button, Text } from "react-native-paper";
export interface CustomDialogHandles {
  showDialog: (title: string, message: string) => void;
  hideDialog: () => void;
}

interface CustomDialogProps {
  action?: () => void;
  onVisibilityChange?: (visible: boolean) => void;
}

const CustomDialog = forwardRef<CustomDialogHandles, CustomDialogProps>(
  ({ action, onVisibilityChange }, ref) => {
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [actionButtonTitle, setActionButtonTitle] = useState<string>("Okay");
    const [message, setMessage] = useState<string>("");

    useImperativeHandle(ref, () => ({
      showDialog: (
        title: string,
        message: string,
        actionButtonTitle?: string
      ) => {
        setTitle(title);
        setMessage(message);
        if (actionButtonTitle) setActionButtonTitle(actionButtonTitle);
        setDialogVisible(true);
      },
      hideDialog: () => {
        setDialogVisible(false);
      },
    }));

    const handleAction = () => {
      if (action) action();
      setDialogVisible(false);
    };

    useEffect(() => {
      if (onVisibilityChange) onVisibilityChange(dialogVisible);
    }, [dialogVisible, onVisibilityChange]);

    return (
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
        >
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Text>{message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleAction}>{actionButtonTitle}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
);

export default CustomDialog;
