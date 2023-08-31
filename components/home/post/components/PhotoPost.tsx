import { View, Text, FlatList, Pressable, Button } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../../types/navigation";

import FastImage from "react-native-fast-image";
export default function PhotoPost({
  photoUri,
  width,
  id,
}: {
  photoUri: string[];
  width: number;
  id: string;
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
        <View
          style={{
            width: width * 0.8,
            height: 150,
            borderRadius: 15,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            android_ripple={{ color: "#000000", foreground: true }}
            onPress={() => {
              navigation.navigate("ImageFullScreen", { photoUri: item, id });
            }}
            style={{
              width: width,
              height: 150,
              paddingHorizontal: 4,
              borderRadius: 15,
            }}
          >
            <FastImage
              style={{ flex: 1, width: "100%", borderRadius: 15 }}
              resizeMode="cover"
              source={{ uri: item }}
            />
          </Pressable>
        </View>
      )}
    />
  );
}
