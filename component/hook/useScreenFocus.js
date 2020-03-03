import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function useScreenFocus() {
  const [screenFocus, setScreenFocus] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setScreenFocus(true);

      return () => {
        setScreenFocus(false);
      };
    }, [])
  );
  return screenFocus;
}
