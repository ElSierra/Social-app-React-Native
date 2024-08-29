import {
  View,
  Text,
  FlatList,
  Pressable,
  Button,
  Image as RNImage,
  Linking,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../../types/navigation";
import { useState } from "react";
import useGetMode from "../../../../hooks/GetMode";

import * as WebBrowser from "expo-web-browser";

export default function LinkPost({
  photoUri,

  id,
  title,
  url,
}: {
  photoUri: string[];

  id: string;
  title: string;
  url: string;
}) {
  const [result, setResult] = useState<WebBrowser.WebBrowserResult | null>(
    null
  );

  const doesUrlContainHttp = url.includes("https://") || url.includes("http://");
  const urlToOpen = doesUrlContainHttp ? url : `https://${url}`;

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(urlToOpen,{
      
    });
    setResult(result);
  };
  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const backgroundColor = dark ? "#131313" : "#F1F1F1";
  const navigation = useNavigation<HomeNavigationProp>();
  const isDark = dark;
  const toolbarColor = isDark ? "black" : "white";

  return (
    <View
      style={{
        width: "100%",
        height: photoUri[0] ? 200 : 50,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 15,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        android_ripple={{ color: "#000000", foreground: true }}
        onPress={_handlePressButtonAsync}
        style={{
          width: "100%",
          height: photoUri[0] ? 200 : 50,

          borderRadius: 15,
        }}
      >
        {photoUri[0] && (
          <Image
            style={{
              height: 150,
              width: "100%",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
            contentFit="cover"
            transition={1000}
            source={{ uri: photoUri[0] }}
          />
        )}
        <View
          style={{
            backgroundColor,
            height: 50,
            justifyContent: "center",

            paddingHorizontal: 10,
            paddingBottom: 5,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
        >
          <Text numberOfLines={1} style={{ color, fontFamily: "jakaraBold" }}>
            {title}
          </Text>
          <Text numberOfLines={1} style={{ color }}>
            {url}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
