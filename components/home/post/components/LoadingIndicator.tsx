import React from "react";
import { ActivityIndicator } from "react-native";

function Loading() {
  return <ActivityIndicator size={"large"} color={"white"} />;
}

export default React.memo(Loading);
