import { View, Text, Animated } from "react-native";
import React, { useMemo } from "react";
import AvatarName from "./AvatarName";
import { FlatList } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useGetMode from "../../../hooks/GetMode";
import { useAppSelector } from "../../../redux/hooks/hooks";
import Me from "./Me";

export default function Recent({ offset }: { offset: Animated.Value }) {
  const HEADER_HEIGHT = 300;
  const Header_Min_Height = 70;
  const insets = useSafeAreaInsets();

  const headerHeight = offset.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [HEADER_HEIGHT / 2, 0],
    extrapolate: "clamp",
  });
  const opacity = offset.interpolate({
    inputRange: [0, HEADER_HEIGHT / 2],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const dark = useGetMode();
  const color = dark ? "#FFFFFF" : "#000000";
  const userId = useAppSelector((state) => state.user?.data?.id);
  const onlineIds = useAppSelector((state) => state?.online?.ids);

  const chatList = useAppSelector((state) => state?.chatlist?.data);

  const onlineUsers = useMemo(() => {
    return chatList.filter((item) => {
      if (item?.users?.length === 1) {
        return item?.users[0]?.id;
      }
      return onlineIds?.includes(
        item?.users[0]?.id === userId ? item?.users[1]?.id : item?.users[0]?.id
      );
    });
  }, [chatList, onlineIds, userId]);

  return (
    <Animated.View
      style={{
        height: headerHeight,

        opacity,
      }}
    >
      <View style={{ paddingHorizontal: 14, paddingTop: 0, paddingBottom: 20 }}>
        <Text style={{ fontFamily: "jakara", letterSpacing: 4, color }}>
          ONLINE
        </Text>
      </View>
      <FlatList
        horizontal={true}
        ListHeaderComponent={onlineUsers?.length === 0 ? <Me /> : undefined}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}
        renderItem={({ item }) => (
          <AvatarName
            id={item.id}
            receiverId={
              item.users.length === 1
                ? item?.users[0]?.id
                : item?.users[0]?.id === userId
                ? item?.users[1]?.id
                : item?.users[0]?.id
            }
            userName={
              item.users.length === 1
                ? item?.users[0]?.userName
                : item?.users[0]?.id === userId
                ? item?.users[1]?.userName
                : item?.users[0]?.userName
            }
            imageUri={
              item.users?.length === 1
                ? item.users[0]?.imageUri
                : item.users[0]?.id === userId
                ? item.users[1]?.imageUri
                : item.users[0]?.imageUri
            }
          />
        )}
        data={onlineUsers}
      />
    </Animated.View>
  );
}
