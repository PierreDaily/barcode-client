import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BarcodeScan } from "../features/barcode-scan";
import { addPriceNavigator } from "./addPrice";
import { HomeScreen } from "../features/home-screen";
import { ItemDetails } from "../features/item-details";
import { ItemSaved } from "../features/item-saved";
import { CapturePhoto } from "../features/capture-photo";
import { SearchList } from "../features/search-brand";
import { SignIn } from "../features/sign-in";
import { Stack } from "./config";

export const NavigationRoot = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="sign-in"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Add-price" component={addPriceNavigator} />
      <Stack.Screen name="Barcode-scan" component={BarcodeScan} />
      <Stack.Screen name="Search" component={SearchList} />
      <Stack.Screen name="Item-photo" component={CapturePhoto} />
      <Stack.Screen name="Item-details" component={ItemDetails} />
      <Stack.Screen name="Item-saved" component={ItemSaved} />
    </Stack.Navigator>
  </NavigationContainer>
);
