import { BlurView } from "expo-blur";
import { View, Text, Dimensions, useColorScheme } from "react-native";

export default function Fab({ item }: { item: JSX.Element }) {
  const height = Dimensions.get("screen").height;
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const tint = isDark ? "dark" : "light";
  return (
    <View
      style={{
        position: "absolute",
        top: height * 0.85,
        borderRadius: 999,
        right: 10,
        overflow: "hidden",
        zIndex: 999,
      }}
    >
      <BlurView
        intensity={70}
        tint={tint}
        style={{
          width: 60,
          height: 60,
          backgroundColor: "#04511256",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {item}
      </BlurView>
    </View>
  );
}
