import { View, Text, FlatList, Animated } from "react-native";
import React from "react";
import ListContainer from "./ListContainer";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../types/navigation";
export default function ChatList({ offset }: { offset: Animated.Value }) {
 
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F0F0F0",
        borderRadius: 50,

        overflow: "hidden",
      }}
    >
      <Animated.FlatList
        scrollEventThrottle={16}
        contentContainerStyle={{ gap: 0, paddingBottom: 100 }}
        data={[
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item }) => <ListContainer />}
      />
    </View>
  );
}
