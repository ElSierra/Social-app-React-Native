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
import InAppBrowser from "react-native-inappbrowser-reborn";

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
  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const backgroundColor = dark ? "#131313" : "#F1F1F1";
  const navigation = useNavigation<HomeNavigationProp>();
  const isDark = dark;
  const toolbarColor = isDark ? "black" : "white";
  const openLink = async () => {
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: "cancel",
          preferredBarTintColor: toolbarColor,
          preferredControlTintColor: color,
          readerMode: false,
          animated: true,
          modalPresentationStyle: "fullScreen",
          modalTransitionStyle: "coverVertical",
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,

          toolbarColor: toolbarColor,
          secondaryToolbarColor: toolbarColor,
          navigationBarColor: toolbarColor,
          navigationBarDividerColor: "white",
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: true,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: "slide_in_right",
            startExit: "slide_out_left",
            endEnter: "slide_in_left",
            endExit: "slide_out_right",
          },
          headers: {
            "my-custom-header": "my custom header value",
          },
        });
      } else Linking.openURL(url);
    } catch (error) {}
  };
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
        onPress={() => {
          openLink();
        }}
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
            height:50,
            justifyContent:"center",
            
            paddingHorizontal: 10,
            paddingBottom: 5,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
        >
          <Text numberOfLines={1} style={{ color, fontFamily: "jakaraBold" }}>{title}</Text>
          <Text numberOfLines={1} style={{ color }}>{url}</Text>
        </View>
      </Pressable>
    </View>
  );
}
