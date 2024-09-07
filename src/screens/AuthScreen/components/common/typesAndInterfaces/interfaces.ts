import { CustomDialogHandles } from "../../../../../common/components/CustomDialog";

export interface SignInComponentProps {
  handleSignIn: (
    signInMethod: () => Promise<{ data: any; error: any }>,
    loginType: string,
    navigation: any,
    dispatch: any,
    errorDialog: any
  ) => void;
  errorDialog: CustomDialogHandles;
}
