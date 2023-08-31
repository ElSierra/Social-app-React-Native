import { View, Dimensions, Pressable, Text } from "react-native";

import ProfileImage from "../components/ProfileImage";
import NameAndTag from "../components/NameAndTag";

import PhotoPost from "../components/PhotoPost";
import VideoPost from "../components/VideoPost";
import Engagements from "../components/Engagements";
import useGetMode from "../../../../hooks/GetMode";
import AudioPost from "../components/AudioPost";
import { ICommentBuilder, IPostBuilder } from "../../../../types/app";
import { ProfileIcon } from "../../../icons";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../../types/navigation";
import { dateAgo } from "../../../../util/date";
import Animated, { FadeInLeft } from "react-native-reanimated";
export default function CommentBuilder({
  imageUri,
  name,
  date,
  userTag,
  verified,
  comment,
}: ICommentBuilder) {
  const dark = useGetMode();
  const isDark = dark;
  const borderBottomColor = isDark ? "#252222" : "#CCC9C9";
  const color = isDark ? "#FFFFFF" : "#000000";
  const rColor = isDark ? "#FFFFFF2A" : "#0000001B";
  const selectionColor = isDark ? "#C5C5C591" : "#0000007A";

  return (
    <Animated.View
      entering={FadeInLeft.springify()}
      style={{
        borderBottomWidth: 0.5,
        borderBottomColor,
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          gap: 10,
        }}
      >
        <View
          style={{
            height: 50,
            width: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 9999,
            overflow: "hidden",
          }}
        >
          <Pressable
            onPress={() => {}}
            android_ripple={{ color: rColor, foreground: true }}
            style={{
              height: 50,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {imageUri ? (
              <ProfileImage imageUri={imageUri} />
            ) : (
              <ProfileIcon color={color} size={58} />
            )}
          </Pressable>
        </View>
        <View style={{ width: "85%", justifyContent: "flex-start" }}>
          <NameAndTag
            name={name}
            verified={verified}
            userTag={userTag}
            dateAgo={dateAgo(new Date(date))}
          />
          <Text
            selectable
            selectionColor={selectionColor}
            numberOfLines={2}
            style={{
              color,
            }}
          >
            {comment}
          </Text>
          <View></View>
        </View>
      </View>
    </Animated.View>
  );
}
