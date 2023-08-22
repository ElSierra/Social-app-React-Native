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
  return (
    <Text
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
