import { View, Text, FlatList, ListRenderItem } from "react-native";
import React from "react";
import TypingBox from "../../chat/TypingBox";
import { IChatList } from "../../../types/api";
import Animated, { SequencedTransition } from "react-native-reanimated";

function ChatListView({
  isTyping,
  messageText,
  userChats,
  renderItem,
}: {
  isTyping: boolean;
  messageText: string;
  userChats?: IChatList;
  renderItem: ListRenderItem<any>;
}) {
  
  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        itemLayoutAnimation={SequencedTransition}
        inverted
        initialNumToRender={30}
        ListHeaderComponent={() => {
          return (
            <View
              style={{
                height: 90,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              {isTyping && messageText.length < 1 && <TypingBox />}
            </View>
          );
        }}
        data={userChats?.messages}
        contentContainerStyle={{ gap: 15, padding: 20, paddingBottom: 100 }}
        renderItem={renderItem}
      />
    </View>
  );
}
export default ChatListView;
