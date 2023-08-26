import { View, Text, useColorScheme } from "react-native";
import React from "react";
import useGetMode from "../../../../hooks/GetMode";

export default function TextPost({
  postText,
  photoUri,
  videoUri,
}: {
  postText: string;
  photoUri: string[];
  videoUri?: string;
}) {
  const dark = useGetMode();
  const isDark = dark;
  const color = isDark ? "white" : "black";
  const selectionColor = isDark ? "#C5C5C591" : "#0000007A"
  return (
    <Text
    selectable
    selectionColor={selectionColor}
    numberOfLines={2}
      style={{
        
        marginBottom: photoUri.length > 0 || videoUri ? 2 : 10,
        color,
      }}
    >
      {postText}
    </Text>
  );
}
