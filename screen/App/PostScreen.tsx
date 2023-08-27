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
export default function PostScreen({ navigation, route }: ViewPost) {
  const { params } = route;
  const dispatch = useAppDispatch();
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentText, setCommentText] = useState<string | null>(null);
  const user = useAppSelector((state) => state.user.data);
  const [postComment, postCommentResponse] = usePostCommentMutation();
  console.log(
    "🚀 ~ file: PostScreen.tsx:15 ~ PostScreen ~ comments:",
    comments
  );
  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const textColor = !dark ? "white" : "black";
  const [getComments, commentResponse] = useLazyGetCommentByPostQuery();

  useEffect(() => {
    getComments({ id: params.id })
      .unwrap()
      .then((r) => {
        setComments(r.comment);
      })
      .catch((e) => {
        dispatch(openToast({ text: "Failed to get Comments", type: "Failed" }));
      });
  }, []);

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
  }, []);

  const handleCommentPost = () => {
    Keyboard.dismiss();
    setCommentText("")
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
    <AnimatedScreen>
      <FlatList
        style={{ borderBottomWidth: 0.5, borderBottomColor: "#7a868f" }}
        ListHeaderComponent={<FullScreenPost {...params} />}
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
      <View
        style={{
          position: "absolute",
          bottom: 0,
          zIndex: 999,
          width: "100%",
          paddingBottom: 10,
          paddingHorizontal: 25,
        }}
      >
        <BlurView
          intensity={80}
          tint={tint}
          style={{ position: "absolute", width: "150%", height: "150%" }}
        />
        <TextInput
          placeholder="Post comment"
          value={commentText || ""}
          onChangeText={setCommentText}
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
      </View>
    </AnimatedScreen>
  );
}
