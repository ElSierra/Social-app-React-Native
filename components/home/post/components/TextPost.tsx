import { View, Text } from "react-native";
import React from "react";

export default function TextPost({
  postText,
  photoUri,
  videoUri,
}: {
  postText: string;
  photoUri: string[];
  videoUri?: string 
}) {
  return (
    <Text style={{ marginVertical: photoUri.length > 0 || videoUri ? 2 : 10 }}>
      {postText}
    </Text>
  );
}
