import React from "react";
import { Stack } from "./config";
import { AnyDiscountIndex } from "../features/any-discount-index";
import { DiscountIndexQuantity } from "../features/discount-index-quantity";
import { IsItDiscount } from "../features/is-it-discount";
import { HowMuch } from "../features/add-price";
import { SelectBranch } from "../features/select-branch";

const addPriceNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Select-branch"
      component={SelectBranch}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="How-much"
      component={HowMuch}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Is-it-discount"
      component={IsItDiscount}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Any-discount-index"
      component={AnyDiscountIndex}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Discount-index-quantity"
      component={DiscountIndexQuantity}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Price-saved"
      component={HowMuch}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export { addPriceNavigator };
