import { View, Text, TextInput, Dimensions } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import InputText from "../../screen/Auth/components/InputText";
import useGetMode from "../../hooks/GetMode";
const heightFromScreen = Dimensions.get("screen").height;
export default function TextArea() {
  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const [height, setHeight] = useState(50);
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Image
          style={{ height: 50, width: 50, borderRadius: 9999 }}
          source={require("../../assets/avatar/placeholder.png")}
        />
        <Text
          style={{
            fontSize: 20,
            fontFamily: "jakara",
            includeFontPadding: false,
          }}
        >
          @hojoisaac
        </Text>
      </View>
      <View style={{ marginLeft: 55, minHeight: heightFromScreen / 5 }}>
        <TextInput
          multiline
          cursorColor={color}
          onContentSizeChange={(event) => {
            setHeight(event.nativeEvent.contentSize.height);
          }}
          style={{
            fontSize: 20,
            color,

            fontFamily: "mulishMedium",
            maxHeight: height,
            alignItems: "flex-start",
          }}
          placeholder="What's happening?"
        />
      </View>
    </View>
  );
}
