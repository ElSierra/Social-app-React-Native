import { View, Text, FlatList, Pressable, Button } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../../types/navigation";
import { SharedElement } from "react-navigation-shared-element";
import { Image } from "expo-image";


export default function PhotoPostFullScreen({
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
      snapToInterval={width}
      snapToAlignment={"center"}
      decelerationRate={"fast"}
      renderItem={({ item }) => (
        <View
          style={{
            width: width * 0.95,
            height: 150,
            borderRadius: 15,
            justifyContent:"center",
            alignItems:"center",
            overflow: "hidden",
          }}
        >
          <Pressable
            android_ripple={{ color: "#000000", foreground: true }}
            onPress={() => {
              navigation.navigate("ImageFullScreen", { photoUri: item,id });
            }}
            style={{
              width: width  ,
              height: 150,
              paddingHorizontal: 4,
              borderRadius: 15,
            }}
          >
            <SharedElement id={id} style={{flex:1}}>
              <Image
               
                style={{ flex: 1, width: "100%", borderRadius: 15 }}
                contentFit="cover"
                source={{ uri: item }}
              />
            </SharedElement>
          </Pressable>
        </View>
      )}
    />
  );
}
