import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.putahe.app',
  appName: 'Putahe',
  webDir: 'www',
  plugins: {
    FirebaseAuthentication: {
      authDomain: undefined,
      skipNativeAuth: false,
      providers: ["google.com"]
    }
  }
};

export default config;
