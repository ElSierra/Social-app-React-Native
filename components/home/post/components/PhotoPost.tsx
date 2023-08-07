import { View, Text, FlatList, Pressable, Button } from "react-native";
import { Image } from "expo-image";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../../types/navigation";
import Animated from "react-native-reanimated";
import AnimatedScreen from "../../../global/AnimatedScreen";
import { transition } from "../../../../screen/App/ImageFullScreen";
export default function PhotoPost({
  photoUri,
  width,
}: {
  photoUri: string[];
  width: number;
}) {
  const navigation = useNavigation<HomeNavigationProp>();

  return (
    <FlatList
      horizontal
      data={photoUri}
      style={{ marginVertical: 10 }}
      showsHorizontalScrollIndicator={false}
      snapToInterval={width * 0.8}
      snapToAlignment={"center"}
      decelerationRate={"fast"}
      renderItem={({ item }) => (
        <View style={{ width: width * 0.8, height: 150 , borderRadius:15, overflow:"hidden"}}>
          <Pressable
            android_ripple={{ color: "#000000", foreground: true }}
            onPress={() => {
              navigation.navigate("ImageFullScreen", { photoUri: item });
            }}
            style={{
              width: width * 0.8,
              height: 150,
              paddingHorizontal: 4,
              borderRadius:15
            }}
          >
            <Animated.Image
              width={width * 0.9}
              sharedTransitionStyle={transition}
              style={{ flex: 1, width: "100%", borderRadius: 15 }}
              source={{ uri: item }}
            />
          </Pressable>
        </View>
      )}
    />
  );
}
