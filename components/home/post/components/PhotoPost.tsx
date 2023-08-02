import { View, Text, FlatList, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../../types/navigation";
export default function PhotoPost({photoUri,width}:{photoUri:string[],width: number}) {

    const navigation = useNavigation<HomeNavigationProp>()
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
        <Pressable
        onPress={()=>{navigation.navigate('ImageFullScreen',{photoUri})}}
          style={{
            width: width * 0.8,
            height: 150,
            paddingHorizontal: 4,
          }}
        >
          <Image
            contentFit="cover"
            transition={1000}
            style={{ flex: 1, width: "100%", borderRadius: 15 }}
            source={item}
          />
        </Pressable>
      )}
    />
  );
}
