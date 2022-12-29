//import { TailwindProvider } from "tailwindcss-react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import Navigator from "./src/navigation/Navigator";

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
