import { WebView } from 'react-native-webview';

export default function Home() {
  return (
    <WebView source={{ uri: "file:///android_asset/index.html" }} />
  );
}
