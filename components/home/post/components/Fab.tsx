import { BlurView } from "expo-blur";
import { View, Pressable } from "react-native";
import useGetMode from "../../../../hooks/GetMode";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../../types/navigation";
import DeviceInfo from "react-native-device-info";
import { useAppSelector } from "../../../../redux/hooks/hooks";

export default function Fab({ item }: { item: JSX.Element }) {
  const dark = useGetMode();
  const isDark = dark;
  const navigation = useNavigation<HomeNavigationProp>();
  const tint = isDark ? "dark" : "light";
  const backgroundColor = !isDark ? "#DEDEDE" : "#303030";
  const isHighEndDevice = useAppSelector((state) => state?.prefs?.isHighEnd);

  return (
    <View
      style={{
        position: "absolute",
        bottom: 100,
        borderRadius: 999,
        right: 10,
        borderColor: dark?"#FFFFFF1E":"#00000012",
        borderWidth: 0.5,
      
        alignItems: "center",
        backgroundColor: !isHighEndDevice ? backgroundColor : undefined,
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
          {isHighEndDevice && (
            <BlurView
              experimentalBlurMethod="dimezisBlurView"
              intensity={40}
              tint={tint}
              style={{
                width: "100%",
                height: "100%",

                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          )}
          <View style={{ zIndex: 200 }}>{item}</View>
        </>
      </Pressable>
    </View>
  );
}
