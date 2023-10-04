import { View, Text, Pressable, Dimensions } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../types/navigation";
import useGetMode from "../../../hooks/GetMode";
import { ChatType } from "../../../types/app";
import { formatDateForChat } from "../../../util/date";
import { IChatList } from "../../../types/api";
import { useAppSelector } from "../../../redux/hooks/hooks";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";
import { Image } from "expo-image";
import { ProfileIcon } from "../../icons";
const { width } = Dimensions.get("window");
export default function ListContainer({ data }: { data: IChatList }) {
  const dark = useGetMode();
  const color = dark ? "#FFFFFF" : "#000000";
  const rColor = !dark ? "#FFFFFF" : "#000000";
  const userId = useAppSelector((state) => state.user?.data?.id);
  const onlineIds = useAppSelector((state) => state?.online?.ids);
  const receiverId =
    data.users?.length === 1
      ? data.users[0]?.id
      : data.users[0]?.id === userId
      ? data.users[1].id
      : data.users[0].id;

  const isOnline = onlineIds?.some((ids) => ids === receiverId);

  const navigation = useNavigation<HomeNavigationProp>();
  const imageUri =
    data.users?.length === 1
      ? data.users[0]?.imageUri
      : data.users[0]?.id === userId
      ? data.users[1].imageUri
      : data.users[0].imageUri;
  return (
    <Pressable
      style={{ width: "100%", padding: 15, paddingHorizontal: 20 }}
      android_ripple={{ color: rColor }}
      onPress={() =>
        navigation.navigate("ChatScreen", {
          id: data.id,
          receiverId,
          name:
            data.users?.length === 1
              ? data.users[0]?.userName
              : data.users[0]?.id === userId
              ? data.users[1].userName
              : data.users[0].userName,
          imageUri:
            data.users?.length === 1
              ? data.users[0]?.imageUri
              : data.users[0]?.id === userId
              ? data.users[1].imageUri
              : data.users[0].imageUri,
        })
      }
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!imageUri ? (
            <ProfileIcon size={60} color={color} />
          ) : (
            <Image
              transition={1000}
              placeholder={
                !dark
                  ? require("../../../assets/images/profile-black.svg")
                  : require("../../../assets/images/profile-white.svg")
              }
              style={{ borderRadius: 999, height: 50, width: 50 }}
              source={{
                uri: imageUri,
              }}
            />
          )}
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
                {data.users?.length === 1
                  ? ` Me`
                  : data.users[0]?.id === userId
                  ? `@ ${data.users[1].userName}`
                  : `@ ${data.users[0].userName}`}
              </Text>
              <Animated.View
                key={isOnline ? `${receiverId}online` : `${receiverId}offline`}
                entering={BounceIn.duration(400)}
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: isOnline ? "green" : "red",
                  borderRadius: 9999,
                }}
              />
            </View>
            <Text
              numberOfLines={1}
              style={{
                width: width / 1.9,
                fontFamily: "mulishRegular",
                fontSize: 16,
                color: "grey",
              }}
            >
              {data.messages[0]?.text ||
                (data.messages[0]?.photo?.imageUri && "📷")}
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
