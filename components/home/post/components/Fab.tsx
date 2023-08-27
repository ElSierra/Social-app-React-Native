import { BlurView } from "expo-blur";
import { View, Pressable } from "react-native";
import useGetMode from "../../../../hooks/GetMode";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../../types/navigation";
import Animated, {
  BounceIn,
  BounceOut,
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
export default function Fab({ item }: { item: JSX.Element }) {
  const dark = useGetMode();
  const isDark = dark;
  const navigation = useNavigation<HomeNavigationProp>();
  const tint = isDark ? "dark" : "light";
  const backgroundColor = !isDark ? "#DEDEDE" :"#303030"
  return (
    <View
      style={{
        position: "absolute",
        bottom: 100,
        borderRadius: 999,
        right: 10,

        alignItems: "center",

        justifyContent: "center",
        width: 65,
        height: 65,
        overflow: "hidden",
        zIndex: 999,
      }}
    >
      <Pressable
        android_ripple={{ color: "white", foreground: true }}
        onPress={() => {
          navigation.navigate("PostContent");
        }}
        style={{
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <>
          <BlurView
            intensity={70}
            tint={tint}
            style={{
              width: "100%",
              height: "100%",
           backgroundColor,
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <View style={{ zIndex: 200 }}>{item}</View>
        </>
      </Pressable>
    </View>
  );
}
