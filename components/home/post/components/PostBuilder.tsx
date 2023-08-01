import { View, Text } from "react-native";
import { Image } from "expo-image";
import { ReactNode } from "react";
import {
  ActivityUnfocused,
  CommentIcon,
  HeartUnfocused,
  Love,
  MessageUnfocused,
  ShareUnfocused,
} from "../../../icons";
import IconWithValue from "./IconWithValue";

export default function PostBuilder({
  imageUri,
  children,
  view,
  like,
  repost,
  title,
}: {
  imageUri: string;
  children: ReactNode;
  text?: string;
  view?: string;
  like?: string;
  repost?: string;
  title?: string;
}) {
  return (
    <View
      style={{
        borderBottomWidth: 0.5,
        borderBottomColor: "#CCC9C9",
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
        }}
      >
        <View style={{ width: "15%" }}>
          <View style={{ width: 50, height: 50 }}>
            <Image
              contentFit="cover"
              style={{ flex: 1, borderRadius: 9999 }}
              source={imageUri}
            />
          </View>
        </View>
        <View style={{ width: "85%", justifyContent: "flex-start" }}>
          {children}
          <View
            style={{
              flexDirection: "row",

              alignItems: "center",

              gap: 6,
              justifyContent: "space-between",
            }}
          >
            {title && <Text>{title}</Text>}
            <IconWithValue Icon={MessageUnfocused} text="210" />
            <IconWithValue Icon={HeartUnfocused} text="110K" />
            <IconWithValue Icon={ActivityUnfocused} text="110K" />
            <ShareUnfocused size={20} color="black"/>
          </View>
        </View>
      </View>
    </View>
  );
}
