import { View, Text, Dimensions, Pressable } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { dateAgo } from "../../../util/date";
import { FollowIcon, ProfileIcon } from "../../icons";
import useGetMode from "../../../hooks/GetMode";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../types/navigation";
import Animated, { FadeInRight } from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function NotificationBuilder({
  imageUri,
  text,
  type,
  id,
  date,
  postId,
  index,
  name,
  userId,
  userName,
  verified,
  position,
}: {
  imageUri?: string;
  text: string;
  date: string;
  name?: string;
  verified?: boolean;
  userId?: string;
  postId?: string;
  userName?: string;
  id: string;
  index: number;
  type: "Follow" | "Posts" | "Reminder" | "Suggestions";
  position: "first" | "last" | "middle";
}) {
  const dark = useGetMode();
  const color = !dark ? "black" : "white";
  const rColor = dark ? "#555555" : "#B0B0B0";
  const backgroundColor = !dark ? "#F2F3F799" : "#25252599";
  const navigate = useNavigation<HomeNavigationProp>();
  return (
    <Animated.View
      entering={FadeInRight.springify()}
      style={{
        flexDirection: "row",
        paddingHorizontal: 10,
        borderColor: "#B4B4B488",
        borderRadius: 999,
        padding: 3,
        backgroundColor,
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <View style={{ width: "10%" }}>
        <FollowIcon size={30} color={color} />
      </View>
      <View style={{ width: "90%", borderRadius: 10, overflow: "hidden" }}>
        <Pressable
          android_ripple={{ color: rColor }}
          onPress={() => {
            if (type === "Follow") {
              navigate.navigate("ProfilePeople", {
                id: userId as string,
                imageUri: imageUri as string,
                userTag: userName as string,
                name: name as string,
                verified: verified as boolean,
              });
            }
            if (type === "Posts") {
              //@ts-ignore
              navigate.navigate("ViewPost", { postId });
            }
          }}
        >
          <View
            style={{
              flexDirection: "row",

              gap: 10,
              padding: 10,

              borderRadius: 10,
            }}
          >
            <View style={{ justifyContent: "center" }}>
            {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={{ height: 30, width: 30, borderRadius: 9999 }}
            />
          ) : (
            <ProfileIcon color={color} size={34} />
          )}
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  includeFontPadding: false,
                  fontSize: 12,
                  color,
                  fontFamily: "mulishMedium",
                }}
              >
                {dateAgo(new Date(date))}
              </Text>
              <Text
                numberOfLines={2}
                style={{
                  width: width / 1.7,
                  fontSize: 14,
                  color,
                  fontFamily: "jakaraBold",
                  includeFontPadding: false,
                }}
              >
                {text}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    </Animated.View>
  );
}
