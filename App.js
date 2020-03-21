import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BarcodeScan from "./component/barcodeScan/BarcodeScan";
import ItemDetails from "./component/itemDetails/ItemDetails";
import ItemSaved from "./component/itemSaved/ItemSaved";
import Camera from "./component/camera/Camera";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

const Stack = createStackNavigator();
console.log(process.env);
function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={BarcodeScan} />
          <Stack.Screen name="Item-photo" component={Camera} />
          <Stack.Screen name="Item-details" component={ItemDetails} />
          <Stack.Screen name="Item-saved" component={ItemSaved} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

AppRegistry.registerComponent("app", () => App);

export default App;
