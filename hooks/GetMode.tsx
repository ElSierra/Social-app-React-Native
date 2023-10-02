import { View, Text, useColorScheme } from "react-native";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useAppSelector } from "../redux/hooks/hooks";

export default function useGetMode() {
  const scheme = useColorScheme();
  const [dark, setDark] = useState(false);
  const { mode } = useAppSelector((state) => state.prefs);

  useEffect(() => {
    if (mode === "system") {
      setDark(scheme === "dark");
    } else {
      setDark(mode === "dark");
    }
  }, [mode, scheme]);

  return dark;
}
