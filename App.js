import React from "react";
import "react-native-gesture-handler";
import { LoadRessources } from "./features/load-ressources";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { theme } from "./config";
import { NavigationRoot } from "./navigation";
import { RecoilRoot } from "recoil";
import StorybookUIRoot from "./storybook";

function App() {
  return (
    <RecoilRoot>
      <PaperProvider theme={theme}>
        <LoadRessources>
          <NavigationRoot />
        </LoadRessources>
      </PaperProvider>
    </RecoilRoot>
  );
}

AppRegistry.registerComponent("app", () => App);

function Storybook() {
  return (
    <PaperProvider theme={theme}>
      <LoadRessources>
        <StorybookUIRoot />
      </LoadRessources>
    </PaperProvider>
  );
}

export default process.env && process.env.EXPO_RUN_STORYBOOK === "TRUE"
  ? Storybook
  : App;
