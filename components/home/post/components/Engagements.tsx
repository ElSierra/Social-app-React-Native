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

export default function Engagements({
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
  const [likeAmount, setLikeAmount] = useState(()=>like);
  const [clicked, setClicked] = useState(()=>isLiked);
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

  const color = isDark ? "white" : "black";
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 20,

        alignItems: "center",

        gap: 6,
        justifyContent: "space-between",
      }}
    >
      {title && <Text>{title}</Text>}
      <View style={{ flexDirection: "row" }}>
        {/* <IconWithValue
        animationRef={animationRef}
          IconUnfocused={MessageUnfocused}
          text={comments?.toString() || "0"}
          IconFocused={MessageUnfocused}
          clicked={clicked}
          setClicked={handleClicked}
        /> */}
        <LikeButton
          isLiked={isLiked}
          text={likeAmount.toString()}
          clicked={clicked}
          setClicked={handleClicked}
        />
      </View>
      <ShareUnfocused size={20} color={color} />
    </View>
  );
}
