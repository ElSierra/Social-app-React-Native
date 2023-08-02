import { View, Text, Pressable, FlatList, Dimensions } from "react-native";
import { Image } from "expo-image";
import { ReactNode, useRef, useState } from "react";
import {
  ActivityUnfocused,
  CommentIcon,
  HeartUnfocused,
  Love,
  MessageUnfocused,
  PlayIcon,
  ShareUnfocused,
  VerifiedIcon,
} from "../../icons";
import IconWithValue from "./components/IconWithValue";
import { Video, ResizeMode } from "expo-av";
import IconButton from "../../global/IconButton";
import ProfileImage from "./components/ProfileImage";
import NameAndTag from "./components/NameAndTag";
import TextPost from "./components/TextPost";
import PhotoPost from "./components/PhotoPost";
import VideoPost from "./components/VideoPost";
import Engagements from "./components/Engagements";

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
}: {
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
}) {
  const video = useRef<null|Video>(null);
  const [status, setStatus] = useState({});
  console.log("🚀 ~ file: PostBuilder.tsx:44 ~ status:", status);
  const [play, setPlay] = useState(false);
  const width = Dimensions.get("screen").width;
  const handlePlay = () => {
    setPlay(!play);
  };
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
              <PhotoPost photoUri={photoUri} width={width} />
            )}
          </View>
          {videoUri && (
            <VideoPost
              handlePlay={handlePlay}
              videoTitle={videoTitle}
              play={play}
              video={video}
              videoUri={videoUri}
              setStatus={setStatus}
              videoViews={videoViews}/>
          )}
          <Engagements title={title} />
        </View>
      </View>
    </View>
  );
}
