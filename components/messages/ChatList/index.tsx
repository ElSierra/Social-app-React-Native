import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import React from "react";
import ListContainer from "./ListContainer";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../types/navigation";
import useGetMode from "../../../hooks/GetMode";
import { useAppSelector } from "../../../redux/hooks/hooks";
import LoadingIndicator from "../../home/post/components/LoadingIndicator";
import Animated, {
  ScrollHandlerProcessed,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
export default function ChatList({
  scrollHandler,
  offset,
}: {
  scrollHandler: ScrollHandlerProcessed<Record<string, unknown>>;
  offset: SharedValue<number>;
}) {
  const dark = useGetMode();
  const flatStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: interpolate(offset.value, [0, 110], [10, -5]) }],
    };
  });
  const { height } = useWindowDimensions();
  const chatList = useAppSelector((state) => state.chatlist);
  const backgroundColor = dark ? "#0D0F13" : "#F0F0F0";
  const color = !dark ? "black" : "white";
  
  return (
    <Animated.View
      style={[
        {
       
          backgroundColor,
          borderRadius: 50,
          height: height,
          overflow: "hidden",
        },
        flatStyle,
      ]}
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
              <Text style={{ fontFamily: "jakaraBold" }}>
                Start Chatting Now!
              </Text>
            </View>
          ) : (
            <Animated.FlatList
              contentContainerStyle={{
                gap: 0,
                paddingBottom: 300,
                paddingTop: 20,
              }}
              data={chatList.data}
              onScroll={scrollHandler}
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
    </Animated.View>
  );
}
