import { Platform } from 'react-native';

// Conditionally import the library only for Android
let GoogleSignin: any, GoogleSigninButton: any, statusCodes: any;

if (Platform.OS === 'android') {
  const googleSignin = require('@react-native-google-signin/google-signin');
  GoogleSignin = googleSignin.GoogleSignin;
  GoogleSigninButton = googleSignin.GoogleSigninButton;
  statusCodes = googleSignin.statusCodes;
}

import { supabase } from '../../common/supabase';

const GoogleSignIn = () => {
  if (Platform.OS !== 'android') {
    return null; // Don't render anything if the platform is not Android
  }

  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  });

  return (
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={async () => {
          try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            if (userInfo.idToken) {
              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: userInfo.idToken,
              });
              console.log(error, data);
            } else {
              throw new Error('No ID token present!');
            }
          } catch (error: any) {
            console.log(error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // User cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // Operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // Play services not available or outdated
            } else {
              // Some other error happened
            }
          }
        }}
      />
    )
};

export default GoogleSignIn;
