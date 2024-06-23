import { View, Text } from "react-native";

import CheckBoxPair from "./CheckBoxPair";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../../../redux/hooks/hooks";
import useGetMode from "../../../../hooks/GetMode";

export default function DarkModeView() {
  const mode = useAppSelector((state) => state?.prefs?.mode);
  const dark = useGetMode();
  const backgroundColor = dark ? "#969696" : "#B5AEAE";
  const color = dark ? "#FFFFFF" : "#000000";
  const [checked, setChecked] = useState(() => {
    return {
      system: mode === "system",
      dark: mode === "dark",
      light: mode === "light",
    };
  });

  useMemo(() => {
    setChecked({
      system: mode === "system" ? true : false,
      dark: mode === "dark" ? true : false,
      light: mode === "light" ? true : false,
    });
  }, [mode]);

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontFamily: "mulishBold", fontSize: 22, color }}>
          Dark mode
        </Text>
      </View>
      <View style={{ width: "100%", height: 1, backgroundColor }} />
      <View
        style={{
          justifyContent: "space-between",
          height: "80%",
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}
      >
        <CheckBoxPair text="Off" type="light" checked={checked.light} />
        <CheckBoxPair text="On" type="dark" checked={checked.dark} />
        <CheckBoxPair
          text="Use device settings"
          type="system"
          checked={checked.system}
        />
      </View>
    </View>
  );
}
