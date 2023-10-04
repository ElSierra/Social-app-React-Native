import { View, Text, Dimensions, Pressable } from "react-native";

import Animated, { FadeInLeft } from "react-native-reanimated";
import { useState } from "react";
import { IPerson } from "../../../types/api";
import { useLazyFollowUserQuery } from "../../../redux/api/services";
import {
  useLazyGetFollowDetailsQuery,
  useLazyGetUserQuery,
} from "../../../redux/api/user";
import { useAppSelector } from "../../../redux/hooks/hooks";
import useGetMode from "../../../hooks/GetMode";
import { ProfileIcon } from "../../icons";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../types/navigation";

const { width } = Dimensions.get("window");
export default function PeopleContainer({
  name,
  userName,
  id,
  imageUri,
  isFollowed,
}: IPerson) {
  const [follow, setFollow] = useState(() => isFollowed);
  const user = useAppSelector((state) => state.user);
  const navigation = useNavigation<HomeNavigationProp>();
  const [followUser] = useLazyFollowUserQuery();

  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const backgroundColor = !dark ? "#E5E9F899" : "#25252599";
  const nbuttonBackgroundColor = !dark ? "#FFFFFF" : "#000000";
  const fbuttonBackgroundColor = dark ? "#FFFFFF" : "#000000";
  const nBColor = !dark ? "white" : "black";
  const fBColor = dark ? "white" : "black";

  const handleFollow = () => {
    setFollow(!follow);

    followUser({ id }).then((e) => {});
  };
  const isMe = user.data?.userName === userName;
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("ProfilePeople", {
          id,
          imageUri,
          userTag: userName,
          name,
          verified: false,
        });
      }}
    >
      <Animated.View
        entering={FadeInLeft.springify()}
        style={{
          width: "100%",
          overflow: "hidden",
          justifyContent: "space-between",
          padding: 6,
          alignItems: "center",
          flexDirection: "row",
          backgroundColor,
          borderRadius: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={{ height: 30, width: 30, borderRadius: 9999 }}
            />
          ) : (
            <ProfileIcon color={color} size={34} />
          )}
          <View>
            <Text style={{ fontSize: 16, fontFamily: "mulishBold", color }}>
              {name}
            </Text>
            <Text style={{ fontFamily: "jakara", fontSize: 12, color }}>
              @{userName}
            </Text>
          </View>
        </View>
        {!isMe && (
          <View
            style={{
              borderRadius: 999,
              borderWidth: 1,
              backgroundColor: follow ? fbuttonBackgroundColor : "transparent",
              overflow: "hidden",
              borderColor: fbuttonBackgroundColor,
            }}
          >
            <Pressable
              android_ripple={{ color: "white" }}
              onPress={handleFollow}
              style={{ paddingHorizontal: 10, paddingVertical: 6 }}
            >
              <Text
                style={{
                  fontFamily: "jakara",
                  color: !follow ? fBColor : nBColor,
                  includeFontPadding: false,
                }}
              >
                {follow ? "Following" : "Follow"}
              </Text>
            </Pressable>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}
