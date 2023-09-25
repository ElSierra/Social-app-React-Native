import { View, Text } from "react-native";
import React from "react";
import { ChangeDataProp } from "../../types/navigation";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import ChangeName from "./ChangeData/ChangeName";
import ChangePassword from "./ChangeData/ChangePassword";
import ChangeUserName from "./ChangeData/ChangeUserName";

export default function ChangeData({ navigation, route }: ChangeDataProp) {
  const { change } = route.params;
  function getRoute() {
    switch (change) {
      case "name":
        return <ChangeName />;
      case "password":
        return <ChangePassword />;
      default:
        return <ChangeUserName />;
    }
  }
  return <AnimatedScreen>{getRoute()}</AnimatedScreen>;
}
