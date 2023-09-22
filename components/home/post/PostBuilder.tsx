import { View, Dimensions, Pressable } from "react-native";

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
import { dateAgo } from "../../../util/date";
import { useAppSelector } from "../../../redux/hooks/hooks";

export default function PostBuilder({
  imageUri,
  name,
  date,
  isLiked,
  userTag,
  photoUri,
  verified,
  videoUri,
  postText,
  videoTitle,
  comments,
  videoViews,
  title,
  like,
  userId,
  isReposted,
  id,
  audioUri,
  thumbNail,
}: IPostBuilder) {
  const width = Dimensions.get("screen").width;
  const navigation = useNavigation<HomeNavigationProp>();
  const dark = useGetMode();
  const isDark = dark;
  const borderBottomColor = isDark ? "#252222" : "#CCC9C9";
  const color = isDark ? "#FFFFFF" : "#000000";
  const rColor = isDark ? "#00000014" : "#BBBBBB";
  const user = useAppSelector((state) => state.user.data);
  return (
    <View
      style={{
        borderBottomWidth: 0.5,
        borderBottomColor,
      }}
    >
      <Pressable
        onPress={() => {
          navigation.navigate("ViewPost", {
            id,
            date,
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
            videoViews,
            title,
            like,
            userId,
            audioUri,
            thumbNail,
            isReposted,
          });
        }}
        android_ripple={{ color: rColor, foreground: true }}
        style={{ paddingHorizontal: 10, paddingVertical: 10 }}
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
              onPress={() => {
                userId && userId !== user?.id
                  ? navigation.navigate("ProfilePeople", {
                      id: userId,
                      imageUri,
                      userTag,
                      verified,
                      name,
                    })
                  : userId && userId === user?.id
                  ? navigation.navigate("Profile")
                  : null;
              }}
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
            {postText && (
              <TextPost
                postText={postText}
                photoUri={photoUri}
                videoUri={videoUri}
              />
            )}
            <View>
              {photoUri.length > 0 && (
                <PhotoPost
                  id={userId as string}
                  photoUri={photoUri}
                  width={width}
                />
              )}
            </View>
            {videoUri && (
              <VideoPost
                videoTitle={videoTitle}
                imageUri={imageUri}
                name={name}
                userTag={userTag}
                videoUri={videoUri}
                thumbNail={thumbNail}
                videoViews={videoViews}
              />
            )}
            {audioUri && <AudioPost uri={audioUri} photoUri={imageUri} />}
            <Engagements
              title={title}
              comments={comments}
              like={like}
              isLiked={isLiked}
              isReposted ={isReposted}
              id={id}
            />
          </View>
        </View>
      </Pressable>
    </View>
  );
}
