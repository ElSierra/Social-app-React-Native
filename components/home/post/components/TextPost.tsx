import { View, Text, useColorScheme } from "react-native";
import React from "react";

export default function TextPost({
  postText,
  photoUri,
  videoUri,
}: {
  postText: string;
  photoUri: string[];
  videoUri?: string;
}) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const color = isDark ? "white" : "black";
  return (
    <Text
      style={{
        marginBottom: photoUri.length > 0 || videoUri ? 2 : 10,
        color,
      }}
    >
      {postText}
    </Text>
  );
}
