import { BlurView } from "expo-blur";
import { View, Pressable } from "react-native";
import useGetMode from "../../../../hooks/GetMode";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../../types/navigation";
import Toast from "react-native-toast-message";
export default function Fab({ item }: { item: JSX.Element }) {
  const dark = useGetMode();
  const isDark = dark;
  const navigation = useNavigation<HomeNavigationProp>();
  const tint = isDark ? "dark" : "light";
  return (
    <View
      style={{
        position: "absolute",
        bottom: 100,
        borderRadius: 999,
        right: 10,
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
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

              position: "absolute",
              backgroundColor: "#04511256",
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
