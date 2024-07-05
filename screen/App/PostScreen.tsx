import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  Pressable,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import { ViewPost } from "../../types/navigation";
import FullScreenPost from "../../components/home/post/FullScreenPost";
import {
  useLazyGetCommentByPostQuery,
  useLazyGetSinglePostQuery,
  usePostCommentMutation,
} from "../../redux/api/services";
import { IComment } from "../../types/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { openToast } from "../../redux/slice/toast/toast";
import CommentBuilder from "../../components/home/post/comment/CommentBuilder";
import useGetMode from "../../hooks/GetMode";
import Button from "../../components/global/Buttons/Button";
import CommentButton from "../../components/home/post/comment/PostButton";
import uuid from "react-native-uuid";
import { BlurView } from "expo-blur";
import Animated, {
  FadeIn,
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";

export default function PostScreen({ navigation, route }: ViewPost) {
  const { params } = route;
  const dispatch = useAppDispatch();
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentText, setCommentText] = useState<string | null>(null);
  const user = useAppSelector((state) => state.user.data);
  const [postComment, postCommentResponse] = usePostCommentMutation();

  const keyboard = useAnimatedKeyboard({ isStatusBarTranslucentAndroid: true });
  const animatedStyles = useAnimatedStyle(() => ({
    bottom: keyboard.height.value,
  }));

  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const backgroundColor = !dark ? "white" : "black";
  const [getComments, commentResponse] = useLazyGetCommentByPostQuery();
  const [getSinglePost, singlePostResponse] = useLazyGetSinglePostQuery();
  useEffect(() => {
    if (params.id) {
      getComments({ id: params.id })
        .unwrap()
        .then((r) => {
          setComments(r.comment);
        })
        .catch((e) => {
          dispatch(
            openToast({ text: "Failed to get Comments", type: "Failed" })
          );
        });
    } else {
      if (singlePostResponse.data?.posts)
        getComments({ id: singlePostResponse.data?.posts.id })
          .unwrap()
          .then((r) => {
            setComments(r.comment);
          })
          .catch((e) => {
            dispatch(
              openToast({ text: "Failed to get Comments", type: "Failed" })
            );
          });
    }
  }, [params?.id]);

  useEffect(() => {
    if (!params?.id) {
      getSinglePost({ id: params?.postId as string }).then((e) => {
        console.log(e);
      });
    }
  }, [params?.id]);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleCommentPost = () => {
    Keyboard.dismiss();
    setCommentText("");
    if (commentText) {
      setComments((prev) => [
        {
          id: uuid.v4().toString(),
          User: {
            id: "0",
            imageUri: user?.imageUri || "",
            verified: false,
            userName: user?.userName as string,
            name: user?.name as string,
          },
          comment: commentText,
          createdAt: `${new Date()}`,
        },
        ...prev,
      ]);
      postComment({ id: params.id, comment: commentText });
    }
  };
  const tint = dark ? "dark" : "light";
  return (
    <View
     
      style={{ flex: 1, marginTop: 100 }}
    >
      <FlatList
        ListHeaderComponent={
          params.id ? (
            <FullScreenPost {...params} />
          ) : (
            singlePostResponse.data?.posts && (
              <FullScreenPost
                id={singlePostResponse.data?.posts.id}
                isReposted={
                  singlePostResponse.data?.posts?.repostUser?.find(
                    (repostUser) => repostUser?.id === user?.id
                  )
                    ? true
                    : false
                }
                date={singlePostResponse.data?.posts.createdAt}
                link={singlePostResponse.data?.posts.link}
                comments={singlePostResponse.data?.posts._count?.comments}
                like={singlePostResponse.data?.posts._count?.like}
                isLiked={
                  singlePostResponse.data?.posts?.like?.find(
                    (like) => like?.userId === user?.id
                  )
                    ? true
                    : false
                }
                photo={
                  singlePostResponse.data?.posts.photo
                    ? {
                        uri: singlePostResponse.data?.posts.photo?.imageUri,
                        width: singlePostResponse.data?.posts.photo?.imageWidth,
                        height:
                          singlePostResponse.data?.posts.photo?.imageHeight,
                      }
                    : undefined
                }
                thumbNail={singlePostResponse.data?.posts.videoThumbnail}
                imageUri={singlePostResponse.data?.posts.user?.imageUri}
                name={singlePostResponse.data?.posts.user?.name}
                userId={singlePostResponse.data?.posts.user?.id}
                userTag={singlePostResponse.data?.posts.user?.userName}
                verified={singlePostResponse.data?.posts.user?.verified}
                audioUri={singlePostResponse.data?.posts.audioUri || undefined}
                photoUri={singlePostResponse.data?.posts.photoUri}
                videoTitle={
                  singlePostResponse.data?.posts.videoTitle || undefined
                }
                videoUri={singlePostResponse.data?.posts.videoUri || undefined}
                postText={singlePostResponse.data?.posts.postText}
                videoViews={singlePostResponse.data?.posts.videoViews?.toString()}
              />
            )
          )
        }
        data={comments}
        ListEmptyComponent={
          <View style={{ marginTop: 20 }}>
            {commentResponse.isLoading && (
              <ActivityIndicator size={20} color={color} />
            )}
          </View>
        }
        renderItem={({ item }) => (
          <CommentBuilder
            imageUri={item.User?.imageUri}
            name={item.User?.name}
            comment={item.comment}
            date={item.createdAt}
            userTag={item.User.userName}
            verified={item.User.verified}
            photoUri={[]}
            id={item.User.id}
          />
        )}
      />
      <Animated.View
        style={[
          {
            position: "absolute",
            bottom: 0,
            zIndex: 999,
            width: "100%",
            backgroundColor,
            paddingBottom: 10,
            paddingHorizontal: 25,
          },
          animatedStyles,
        ]}
      >
        
        <TextInput
          placeholder="Post comment"
          value={commentText || ""}
          onChangeText={setCommentText}
          placeholderTextColor={"grey"}
          style={{
            borderBottomColor: "#7a868f",
            borderBottomWidth: 0.5,
            fontFamily: "jakara",
            height: 50,
            color,

            width: "100%",
            includeFontPadding: false,
            fontSize: 16,
          }}
        />
        <View style={{ alignItems: "flex-end", width: "100%", paddingTop: 10 }}>
          {isKeyboardVisible && (
            <CommentButton
              onPress={handleCommentPost}
              isDisabled={!commentText}
              isLoading={postCommentResponse.isLoading}
            />
          )}
        </View>
      </Animated.View>
    </View>
  );
}
