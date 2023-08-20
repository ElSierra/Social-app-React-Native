import { View, Text } from "react-native";
import React from "react";
import { Skeleton } from "./Skeleton";

export default function SkeletonGroupPost() {
  return (
    <View style={{ flex: 1,  paddingTop: 100,paddingHorizontal:10, paddingBottom: 100,gap:90 }}>
      {[0, 1, 2].map((idx) => (
        <Skeleton key={idx} />
      ))}
    </View>
  );
}
