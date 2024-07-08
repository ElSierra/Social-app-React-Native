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
import LinkPost from "./components/LinkPost";
import ViewShot from "react-native-view-shot";
import { useRef, useState } from "react";
import Share from "react-native-share";
import { Button, Menu, Divider, PaperProvider } from "react-native-paper";
import Animated, { SlideOutRight } from "react-native-reanimated";
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
  link,
  isReposted,
  id,
  audioUri,
  myPost,
  thumbNail,
  deletePost,
  photo,
  idx
}: IPostBuilder) {
  const width = Dimensions.get("window").width;
  const navigation = useNavigation<HomeNavigationProp>();
  const dark = useGetMode();
  const isDark = dark;
  const backgroundColor = isDark ? "black" : "white";
  const borderBottomColor = isDark ? "#252222" : "#CCC9C9";
  const color = isDark ? "#FFFFFF" : "#000000";
  const rColor = isDark ? "#00000014" : "#BBBBBB";
  const user = useAppSelector((state) => state.user.data);
  const ref = useRef<any>(null);

  const handleShare = () => {
    console.log("shared");
    ref?.current?.capture()?.then((uri: string) => {
      console.log("do something with ", uri);
      Share.open({ urls: [uri] })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
    });
  };

  return (
    <ViewShot ref={ref} options={{ fileName: id, format: "jpg", quality: 0.9 }}>
      <Animated.View
        exiting={SlideOutRight.springify()}
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
              photo,
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
              link,
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
              padding: 10,
              backgroundColor,
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
                deletePost={deletePost}
                verified={verified}
                id={id}
                myPost={myPost || false}
                userTag={userTag}
                dateAgo={dateAgo(new Date(date))}
              />
              {postText &&
                (!link ? (
                  <TextPost
                    postText={postText}
                    photoUri={photoUri}
                    videoUri={videoUri}
                  />
                ) : (
                  <LinkPost
                    id={link.id}
                    photoUri={[link.imageUri || ""]}
                    title={link.title}
                    url={postText}
                  />
                ))}
              <View>
                {photo?.uri && (
                  <PhotoPost
                    id={userId as string}
                    photoUri={photo.uri}
                    width={photo.width}
                    height={photo.height}
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
              {audioUri && <AudioPost idx={idx} uri={audioUri} photoUri={imageUri} />}
              <Engagements
                title={title}
                comments={comments}
                handleShare={handleShare}
                like={like}
                isLiked={isLiked}
                isReposted={isReposted}
                id={id}
              />
            </View>
          </View>
        </Pressable>
      </Animated.View>
    </ViewShot>
  );
}
