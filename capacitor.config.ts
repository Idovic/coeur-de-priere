
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c5ab99629c904ed49b5d10a0ad4b6028',
  appName: 'coeur-de-priere',
  webDir: 'dist',
  server: {
    url: 'https://coeurdepriere.netlify.app/',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#7c7af2',
      showSpinner: false
    },
    StatusBar: {
      style: 'LIGHT_CONTENT',
      backgroundColor: '#7c7af2'
    }
  }
};

export default config;
