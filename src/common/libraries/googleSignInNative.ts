import { isAndroid } from "../constants/constants";

export let GoogleSignin: any, GoogleSigninButton: any, statusCodes: any;

// Load Google Signin only for Android platform
if (isAndroid) {
  const googleSignin = require("@react-native-google-signin/google-signin");
  GoogleSignin = googleSignin.GoogleSignin;
  GoogleSigninButton = googleSignin.GoogleSigninButton;
  statusCodes = googleSignin.statusCodes;
}
