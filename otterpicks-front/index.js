import { registerRootComponent } from 'expo';
<script src="https://accounts.google.com/gsi/client" async defer></script>


import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
