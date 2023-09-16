import { View, Text, Dimensions, Pressable } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { dateAgo } from "../../../util/date";
import { FollowIcon } from "../../icons";
import useGetMode from "../../../hooks/GetMode";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../types/navigation";

const { width } = Dimensions.get("screen");

export default function NotificationBuilder({
  imageUri,
  text,
  type,
  id,
  date,
  index,
  name,
  userId,
  userName,
  verified,
}: {
  imageUri?: string;
  text: string;
  date: string;
  name?: string;
  verified?: boolean;
  userId?: string;
  userName?: string;
  id: string;
  index: number;
  type: "Follow" | "Posts" | "Reminder" | "Suggestions";
}) {
  const dark = useGetMode();
  const color = !dark ? "black" : "white";
  const rColor = dark ? "#555555" : "#B0B0B0";
  const navigate = useNavigation<HomeNavigationProp>();
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 10,
        borderColor: "#B4B4B488",
        borderTopWidth: index == 0 ? 1 : 0,
        padding: 3,
        borderBottomWidth: 1,
        alignItems: "center",
        width,
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
              <Image
                source={{ uri: imageUri }}
                style={{ height: 30, width: 30, borderRadius: 999 }}
              />
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
                  fontSize: 12,
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
    </View>
  );
}
