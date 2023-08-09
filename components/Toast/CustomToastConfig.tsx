import { BaseToast, ErrorToast, ToastProps } from "react-native-toast-message";
import AuthFailed from "./AuthFailed";
import LoginToast from "./LoginToast";
import ConfirmToast from "./ConfirmToast";
import InfoToast from "./InfoToast";
import AuthSuccess from "./AuthSuccess";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "pink" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),

  authFailed: (props: ToastProps) => <AuthFailed {...props} />,
  authSuccess: (props: ToastProps) => <AuthSuccess {...props} />,
  loginToast: (props: any) => <LoginToast {...props} />,
  successToast: (props: any) => <ConfirmToast {...props} />,
  infoToast: (props: any) => <InfoToast {...props} />,
};
