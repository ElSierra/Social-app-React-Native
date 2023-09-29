import { View, Text, FlatList, ListRenderItem } from "react-native";
import React from "react";
import TypingBox from "../../chat/TypingBox";
import { IChatList } from "../../../types/api";

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
  console.log("Messages 🚀🚀🚀🚀👺😒", userChats?.messages);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
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
export default React.memo(ChatListView);
