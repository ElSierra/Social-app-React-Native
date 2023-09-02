import { BlurView } from "expo-blur";
import { View, Pressable } from "react-native";
import useGetMode from "../../../hooks/GetMode";
import { useNavigation } from "@react-navigation/native";

import Animated, {
  BounceIn,
  BounceOut,
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import { HomeNavigationProp } from "../../../types/navigation";
export default function Fab({ item }: { item: JSX.Element }) {
  const dark = useGetMode();
  const isDark = dark;

  const backgroundColor = !isDark ? "#FFFFFF" : "#000000";
  const color = isDark ? "#FFFFFF" : "#000000";
  return (
    <View
      style={{
        position: "absolute",
        bottom: 100,
        borderRadius: 999,
        right: 10,
        backgroundColor,
        alignItems: "center",

        justifyContent: "center",
        width: 65,
        height: 65,
        overflow: "hidden",
        zIndex: 999,
      }}
    >
      <Pressable
        android_ripple={{ color, foreground: true }}
        onPress={() => {}}
        style={{
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <>
          <View style={{ zIndex: 200 }}>{item}</View>
        </>
      </Pressable>
    </View>
  );
}
