import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BarcodeScan from "./component/barcodeScan/BarcodeScan";
import ItemDetails from "./component/itemDetails/ItemDetails";
import ItemSaved from "./component/itemSaved/ItemSaved";
import Camera from "./component/camera/Camera";

const Stack = createStackNavigator();
console.log(process.env);
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={BarcodeScan} />
        <Stack.Screen name="Item-photo" component={Camera} />
        <Stack.Screen name="Item-details" component={ItemDetails} />
        <Stack.Screen name="Item-saved" component={ItemSaved} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
