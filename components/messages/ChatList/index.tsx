import { View, Text, FlatList, Animated } from "react-native";
import React from "react";
import ListContainer from "./ListContainer";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../types/navigation";
import useGetMode from "../../../hooks/GetMode";
import { useAppSelector } from "../../../redux/hooks/hooks";
export default function ChatList({ offset }: { offset: Animated.Value }) {
  const dark = useGetMode();
  const chatList = useAppSelector((state) => state.chatlist.data);
  const backgroundColor = dark ? "#0D0F13" : "#F0F0F0";
  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        borderRadius: 50,

        overflow: "hidden",
      }}
    >
      <Animated.FlatList
        scrollEventThrottle={16}
        contentContainerStyle={{ gap: 0, paddingBottom: 100, paddingTop: 20 }}
        data={chatList}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false }
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ListContainer data= {item} />}
      />
    </View>
  );
}