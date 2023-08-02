import { View, Text } from "react-native";
import { ImageFullScreenProp } from "../types/navigation";
import { Image } from "expo-image";
//Hero Transition

export default function ImageFullScreen({ route }: ImageFullScreenProp) {
  const { photoUri } = route.params;
  console.log("🚀 ~ file: ImageFullScreen.tsx:8 ~ ImageFullScreen ~ photoUri:", photoUri)
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Text>kjkjjkjkkkkkkkkkkk</Text>
    </View>
  );
}
