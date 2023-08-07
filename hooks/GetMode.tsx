import { View, Text, useColorScheme } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks/hooks";

export default function useGetMode() {
  const scheme = useColorScheme();
  const [dark, setDark] = useState(false);
  const { mode } = useAppSelector((state) => state.prefs);

  useLayoutEffect(() => {
    if (mode === "system") {
      if (scheme === "dark") {
        setDark(true);
      } else {
        setDark(false);
      }
    } else {
      if (mode === "dark") {
        setDark(true);
        return;
      }
      setDark(false);
    }
  }, [mode, scheme]);

  return dark;
}
