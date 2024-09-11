import { CustomDialogHandles } from "../../../common/components/CustomDialog";
import { AppDispatch } from "../../../store/store";
import { NavigationType } from "../../../common/typesAndInterfaces/types";

export interface Error {
  code: string;
  status: number;
  message: string;
}
export interface SignInComponentProps {
  handleSignIn: (
    signInMethod: () => Promise<{ data: any; error: Error }>,
    loginType: string,
    navigation: NavigationType,
    dispatch: AppDispatch,
    errorDialog: CustomDialogHandles,
    redirectTo: string | undefined
  ) => void;
  errorDialog: CustomDialogHandles;
  redirectTo?: string | undefined;
}
