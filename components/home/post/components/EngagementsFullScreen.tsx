import { View, Text, useColorScheme } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import LikeButton from "./LikeButton";
import {
  ActivityUnfocused,
  HeartUnfocused,
  HeartsFocused,
  Love,
  MessageUnfocused,
  MessagesIcon,
  ShareUnfocused,
} from "../../../icons";
import useGetMode from "../../../../hooks/GetMode";
import { useLazyLikePostQuery } from "../../../../redux/api/services";
import CommentButton from "./CommentButton";

export default function EngagementsFullScreen({
  title,
  like,
  comments,
  isLiked,
  id,
}: {
  title?: string;
  like: number;
  comments?: number;
  id: string;
  isLiked: boolean;
}) {
  const dark = useGetMode();
  const isDark = dark;
  const [likeAmount, setLikeAmount] = useState(() => like);
  const [clicked, setClicked] = useState(() => isLiked);
  const [clickedComment, setClickedComment] = useState(false);
  const [likePost] = useLazyLikePostQuery();

  const handleClicked = (click: boolean) => {
    setClicked(click);
    likePost({ id });
    if (!clicked) {
      setLikeAmount(likeAmount + 1);
    } else {
      setLikeAmount(likeAmount - 1);
    }
  };
  const handleClickComment = () => {
    setClickedComment(!clickedComment);
  };

  const color = isDark ? "white" : "black";
  return (
    <View style={{}}>
      {title && <Text>{title}</Text>}
      <View></View>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,

          alignItems: "center",

          gap: 6,
          justifyContent: "space-between",
        }}
      >
        {/* <IconWithValue
        animationRef={animationRef}
          IconUnfocused={MessageUnfocused}
          text={comments?.toString() || "0"}
          IconFocused={MessageUnfocused}
          clicked={clicked}
          setClicked={handleClicked}
        /> */}
        <CommentButton
          setClicked={handleClickComment}
          clicked={clickedComment}
        />
        <LikeButton
          isLiked={isLiked}
          clicked={clicked}
          setClicked={handleClicked}
        />
        <ShareUnfocused size={20} color={color} />
      </View>
    </View>
  );
}
