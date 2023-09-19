import {
  View,
  Text,
  FlatList,
  Animated,
  ActivityIndicator,
} from "react-native";
import React from "react";
import ListContainer from "./ListContainer";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../types/navigation";
import useGetMode from "../../../hooks/GetMode";
import { useAppSelector } from "../../../redux/hooks/hooks";
import LoadingIndicator from "../../home/post/components/LoadingIndicator";
export default function ChatList({ offset }: { offset: Animated.Value }) {
  const dark = useGetMode();
  const chatList = useAppSelector((state) => state.chatlist);
  const backgroundColor = dark ? "#0D0F13" : "#F0F0F0";
  const color = !dark ? "black" : "white";
  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        borderRadius: 50,

        overflow: "hidden",
      }}
    >
      {!chatList.loading ? (
        <>
          {chatList.data.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{fontFamily:"jakaraBold"}}>Start Chatting Now!</Text>
            </View>
          ) : (
            <Animated.FlatList
              scrollEventThrottle={16}
              contentContainerStyle={{
                gap: 0,
                paddingBottom: 300,
                paddingTop: 20,

              }}
              data={chatList.data}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: offset } } }],
                { useNativeDriver: false }
              )}
              keyExtractor={(item) => item?.id?.toString()}
              renderItem={({ item }) => <ListContainer data={item} />}
            />
          )}
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color={color} size={40} />
        </View>
      )}
    </View>
  );
}
