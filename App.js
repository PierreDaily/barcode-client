import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BarcodeScan } from "./features/barcode-scan";
import { HomeScreen } from "./features/home-screen";
import { ItemDetails } from "./features/item-details";
import { ItemSaved } from "./features/item-saved";
import { LoadRessources } from "./features/load-ressources";
import { CapturePhoto } from "./features/capture-photo";
import { SearchList } from "./features/search-brand";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

const Stack = createStackNavigator();

function App() {
  return (
    <PaperProvider>
      <LoadRessources>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Barcode-scan" component={BarcodeScan} />
            <Stack.Screen name="Search" component={SearchList} />
            <Stack.Screen name="Item-photo" component={CapturePhoto} />
            <Stack.Screen name="Item-details" component={ItemDetails} />
            <Stack.Screen name="Item-saved" component={ItemSaved} />
          </Stack.Navigator>
        </NavigationContainer>
      </LoadRessources>
    </PaperProvider>
  );
}

AppRegistry.registerComponent("app", () => App);

export default App;
