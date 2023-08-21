import { View, Dimensions } from "react-native";

import { useRef, useState } from "react";

import { Video, ResizeMode } from "expo-av";
import ProfileImage from "./components/ProfileImage";
import NameAndTag from "./components/NameAndTag";
import TextPost from "./components/TextPost";
import PhotoPost from "./components/PhotoPost";
import VideoPost from "./components/VideoPost";
import Engagements from "./components/Engagements";
import useGetMode from "../../../hooks/GetMode";
import AudioPost from "./components/AudioPost";

export type IPostBuilder = {
  imageUri: string;
  name: string;
  userTag: string;
  verified: boolean;
  photoUri: string[];
  videoUri?: string;
  videoTitle?: string;
  postText: string;
  videoViews?: string;
  repost?: string;
  title?: string;
  id: string;
  audioUri?: string;
};
export default function PostBuilder({
  imageUri,
  name,
  userTag,
  photoUri,
  verified,
  videoUri,
  postText,
  videoTitle,
  videoViews,
  title,
  id,
  audioUri,
}: IPostBuilder) {
  const width = Dimensions.get("screen").width;

  const dark = useGetMode();
  const isDark = dark;
  const borderBottomColor = isDark ? "#252222" : "#CCC9C9";
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
          flexDirection: "row",
          width: "100%",
        }}
      >
        <ProfileImage imageUri={imageUri} />
        <View style={{ width: "85%", justifyContent: "flex-start" }}>
          <NameAndTag name={name} verified={verified} userTag={userTag} />
          <TextPost
            postText={postText}
            photoUri={photoUri}
            videoUri={videoUri}
          />
          <View>
            {photoUri.length > 0 && (
              <PhotoPost id={id} photoUri={photoUri} width={width} />
            )}
          </View>
          {videoUri && (
            <VideoPost
              videoTitle={videoTitle}
              imageUri={imageUri}
              name={name}
              userTag={userTag}
              videoUri={videoUri}
              videoViews={videoViews}
            />
          )}
          {audioUri && <AudioPost uri={audioUri} photoUri={imageUri} />}
          <Engagements title={title} />
        </View>
      </View>
    </View>
  );
}
