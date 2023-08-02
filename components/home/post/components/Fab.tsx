import { BlurView } from "expo-blur";
import { View, Text, Dimensions } from "react-native";

export default function Fab({ item }: { item: JSX.Element }) {
  const height = Dimensions.get("screen").height;
  return (
    <View
      style={{
        position: "absolute",
        top: height - 150,
        borderRadius: 999,
        right: 10,
        overflow: "hidden",
        zIndex: 999,
      
      }}
    >
      <BlurView
        intensity={60}
        tint="light"
        style={{
          width: 50,
          height: 50,
 backgroundColor:"#04511256",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {item}
      </BlurView>
    </View>
  );
}
