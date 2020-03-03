import { useEffect, useState } from "react";

export default function useScreenFocus(navigation) {
  const [screenFocus, setScreenFocus] = useState(false);

  useEffect(() => {
    const unSubscribeForus = navigation.addListener("focus", () =>
      setScreenFocus(true)
    );
    const unSubscribeBlur = navigation.addListener("blur", () =>
      setScreenFocus(false)
    );

    return () => {
      unSubscribeBlur();
      unSubscribeForus();
    };
  }, []);
  return screenFocus;
}
