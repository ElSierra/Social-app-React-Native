import { Image } from "expo-image";
import {
  View,
  Text,
  Animated,
  Image as NativeImage,
  ImageBackground,
  Pressable,
} from "react-native";
import { useAppSelector } from "../../redux/hooks/hooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../global/Buttons/Button";
import ButtonOutlined from "./FollowerUser";
import { ProfileIcon } from "../icons";
import useGetMode from "../../hooks/GetMode";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import { PeopleProfileNavigationProp } from "../../types/navigation";
import { ViewProfilePhoto } from "./ViewProfilePhoto";

export default function Header({
  animatedValue,
  imageUri,
  userTag,
  name,
  verified,
}: {
  animatedValue: Animated.Value;
  imageUri: string;
  userTag: string;
  name: string;
  verified: boolean;
}) {
  const user = useAppSelector((state) => state.user);
  const navigation = useNavigation<PeopleProfileNavigationProp>();
  const HEADER_HEIGHT = 100;

  const insets = useSafeAreaInsets();

  const headerHeight = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top + 58],
    extrapolate: "clamp",
  });
  const imageSize = animatedValue.interpolate({
    inputRange: [0, 80 + insets.top],
    outputRange: [80, 0],
    extrapolate: "clamp",
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1 + insets.top],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const opacityText = animatedValue.interpolate({
    inputRange: [0, 1 + insets.top + 58],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const backgroundColor = !dark ? "white" : "black";
  const [isOpen, setIsOpen] = useState(false);
  const handleSetOpen = () => {
    setIsOpen(!isOpen);
  };

  console.log("rocket",user.data?.imageUri)
  return (
    <>
    <ViewProfilePhoto isOpen={isOpen} closeModal={handleSetOpen} imageUri={imageUri} />
      <Animated.View
        style={[
          { height: 300, width: "100%" },
          {
            height: headerHeight,
          },
        ]}
      >
        <View
          style={{ height: "100%", width: "100%", backgroundColor: "black" }}
        >
          {user.data?.imageUri && (
            <ImageBackground
              style={{ flex: 1, opacity: 0.3 }}
              blurRadius={10}
              source={{ uri: imageUri }}
            />
          )}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingLeft: 50,
              paddingVertical: 20,
            }}
          >
            <Animated.Text
              style={[
                { color: "white", fontFamily: "jakaraBold", fontSize: 16 },
                { opacity: opacityText },
              ]}
            >
              {name}
            </Animated.Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          {
            width: 80,
            height: 80,
            borderRadius: 999,
            top: 60 + insets.top,
            padding: 5,

            overflow: "hidden",
            marginLeft: 15,
            zIndex: 99,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor,
            position: "absolute",
          },
          {
            height: imageSize,
            width: imageSize,
            opacity,
          },
        ]}
      >
        <Pressable
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 999,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setIsOpen(true)
          }}
        >
          {user?.data?.imageUri ? (
            <Image
              contentFit="cover"
              style={{ height: "100%", width: "100%", borderRadius: 999 }}
              source={{ uri: imageUri }}
            />
          ) : (
            <ProfileIcon color={color} size={"115%"} />
          )}
        </Pressable>
      </Animated.View>
    </>
  );
}
