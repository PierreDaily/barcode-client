import * as React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { Button } from "./Button";

storiesOf("Task", module)
  .addDecorator(story => (
    <View style={{ flex: 1, justifyContent: "center" }}>{story()}</View>
  ))
  .add("Button", () => (
    <Button onPress={() => alert("click")} mode="contained">
      Click
    </Button>
  ));
