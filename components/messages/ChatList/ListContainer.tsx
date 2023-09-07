import { View, Text, Pressable, Dimensions } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../types/navigation";
import useGetMode from "../../../hooks/GetMode";
import { ChatType } from "../../../types/app";
import { formatDateForChat } from "../../../util/date";
import { IChatList } from "../../../types/api";
import { useAppSelector } from "../../../redux/hooks/hooks";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";
const { width } = Dimensions.get("screen");
export default function ListContainer({ data }: { data: IChatList }) {
  console.log("🚀 ~ file: ListContainer.tsx:13 ~ ListContainer ~ data:", data);
  const dark = useGetMode();
  const color = dark ? "#FFFFFF" : "#000000";
  const rColor = !dark ? "#FFFFFF" : "#000000";
  const userId = useAppSelector((state) => state.user?.data?.id);
  const onlineIds = useAppSelector((state)=> state.online.ids)
  const receiverId =
    data.users[0].id === userId ? data.users[1].id : data.users[0].id;

  const isOnline = onlineIds.some((ids)=> ids === receiverId)
  console.log("🚀 ~ file: ListContainer.tsx:23 ~ ListContainer ~ isOnline:", isOnline)
  const navigation = useNavigation<HomeNavigationProp>();
  return (
    <Pressable
      style={{ width: "100%", padding: 15, paddingHorizontal: 20 }}
      android_ripple={{ color: rColor }}
      onPress={() =>
        navigation.navigate("ChatScreen", {
          id: data.id,
          receiverId ,
          name:
            data.users[0]?.id === userId
              ? data.users[1].userName
              : data.users[0].userName,
          imageUri:
            data.users[0]?.id === userId
              ? data.users[1].imageUri
              : data.users[0].imageUri,
        })
      }
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          <FastImage
            style={{ borderRadius: 999, height: 50, width: 50 }}
            source={{
              uri:
                data.users[0]?.id === userId
                  ? data.users[1].imageUri
                  : data.users[0].imageUri,
            }}
          />
          <View style={{}}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: "jakaraBold",
                  maxWidth: width / 1.7,
                  includeFontPadding: false,
                  fontSize: 16,
                  paddingBottom: 2,
                  color,
                }}
              >
                @
                {data.users[0]?.id === userId
                  ? data.users[1].userName
                  : data.users[0].userName}
              </Text>
              <Animated.View 
              key = {isOnline?`${receiverId}online`: `${receiverId}offline`}
              entering={BounceIn.duration(400)}
            
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: isOnline ? "green": "red",
                  borderRadius: 9999,
                }}
              />
            </View>
            <Text
              numberOfLines={1}
              style={{
                width: width / 1.7,
                fontFamily: "mulishRegular",
                fontSize: 16,
                color: "grey",
              }}
            >
              {data.messages[0]?.text}
            </Text>
          </View>
        </View>
        <Text style={{ fontFamily: "jakara", fontSize: 14, color: "grey" }}>
          {data.messages[0]?.createdAt &&
            formatDateForChat(data.messages[0]?.createdAt)}
        </Text>
      </View>
    </Pressable>
  );
}
