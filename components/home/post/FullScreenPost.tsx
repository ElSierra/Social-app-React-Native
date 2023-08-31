import { View, Dimensions, Pressable, Text } from "react-native";

import ProfileImage from "./components/ProfileImage";
import NameAndTag from "./components/NameAndTag";
import TextPost from "./components/TextPost";
import PhotoPost from "./components/PhotoPost";
import VideoPost from "./components/VideoPost";
import Engagements from "./components/Engagements";
import useGetMode from "../../../hooks/GetMode";
import AudioPost from "./components/AudioPost";
import { IPostBuilder } from "../../../types/app";
import { ProfileIcon } from "../../icons";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../types/navigation";
import EngagementsFullScreen from "./components/EngagementsFullScreen";
import NameAndTagFullScreen from "./components/NameAndTagFullScreen";
import PhotoPostFullScreen from "./components/PhotoPostFullScreen";
import { dateFormatted } from "../../../util/date";
import EngagementsText from "./misc/EngagementText";
export default function FullScreenPost({
  imageUri,
  name,
  isLiked,
  userTag,
  photoUri,
  verified,
  videoUri,
  postText,
  videoTitle,
  comments,
  date,
  videoViews,
  title,
  like,
  thumbNail,
  id,
  audioUri,
}: IPostBuilder) {
  const width = Dimensions.get("screen").width;
  const navigation = useNavigation<HomeNavigationProp>();
  const dark = useGetMode();
  const isDark = dark;
  const borderBottomColor = isDark ? "#252222" : "#CCC9C9";
  const color = isDark ? "#FFFFFF" : "#000000";
  const rColor = isDark ? "#FFFFFF2A" : "#0000001B";
  const [dateString, timeString] = dateFormatted(new Date(date)).split(",");
  return (
    <View
      style={{
        borderBottomWidth: 0.5,
        borderBottomColor,

        paddingHorizontal: 10,
        paddingVertical: 10,
      }}
    >
      <View
        style={{
          width: "100%",
          gap: 10,
        }}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
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
          <NameAndTagFullScreen
            name={name}
            verified={verified}
            userTag={userTag}
          />
        </View>
        <View style={{ width: "100%", justifyContent: "flex-start" }}>
          {postText && (
            <TextPost
              postText={postText}
              photoUri={photoUri}
              videoUri={videoUri}
            />
          )}
          <View>
            {photoUri.length > 0 && (
              <PhotoPostFullScreen id={id} photoUri={photoUri} width={width} />
            )}
          </View>
          {videoUri && (
            <VideoPost
              thumbNail={thumbNail}
              videoTitle={videoTitle}
              imageUri={imageUri}
              name={name}
              userTag={userTag}
              videoUri={videoUri}
              videoViews={videoViews}
            />
          )}
          {audioUri && <AudioPost uri={audioUri} photoUri={imageUri} />}
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <Text
              style={{
                color: "#7a868f",
                fontFamily: "mulishMedium",
                fontSize: 16,
              }}
            >
              {timeString}
            </Text>
            <View
              style={{
                width: 3,
                height: 3,
                backgroundColor: "#7a868f",
                borderRadius: 999,
              }}
            />
            <Text
              style={{
                color: "#7a868f",
                fontFamily: "mulishMedium",
                fontSize: 16,
              }}
            >
              {dateString}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              marginVertical: 10,
              paddingVertical: 10,
              borderTopColor: "#7a868f",
              borderTopWidth: 0.3,
              borderBottomWidth: 0.3,
              borderBottomColor: "#7a868f",
            }}
          >
            <EngagementsText engagementNumber={like} engage="Like" />
            <EngagementsText
              engagementNumber={comments || 0}
              engage="Comment"
            />
          </View>
          <EngagementsFullScreen
            title={title}
            comments={comments}
            like={like}
            isLiked={isLiked}
            id={id}
          />
        </View>
      </View>
    </View>
  );
}
