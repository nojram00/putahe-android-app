import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.putahe.app',
  appName: 'Aicook',
  webDir: 'www',
  plugins: {
    FirebaseAuthentication: {
      authDomain: "putahe-mobile-app.firebaseapp.com",
      skipNativeAuth: false,
      providers: ["google.com"]
    }
  }
};

export default config;
