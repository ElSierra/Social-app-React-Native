import { View, Text, TextInput, Dimensions } from "react-native";
import React, { useState } from "react";

import InputText from "../../screen/Auth/components/InputText";
import useGetMode from "../../hooks/GetMode";
import { useAppSelector } from "../../redux/hooks/hooks";
import { ProfileIcon } from "../icons";
import { Image } from "expo-image";

const heightFromScreen = Dimensions.get("window").height;
export default function TextArea({
  handlePostText,
}: {
  handlePostText: (text: string) => void;
}) {
  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const [height, setHeight] = useState(50);
  const userDetails = useAppSelector((state) => state.user.data);
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        {userDetails?.imageUri ? (
          <Image
            style={{ height: 50, width: 50, borderRadius: 9999 }}
            source={{ uri: userDetails?.imageUri }}
          />
        ) : (
          <ProfileIcon color={color} size={55} />
        )}
        <Text
          style={{
            fontSize: 20,
            fontFamily: "jakara",
            includeFontPadding: false,
          }}
        >
          @{userDetails?.userName}
        </Text>
      </View>
      <View style={{ marginLeft: 55, minHeight: heightFromScreen / 20 }}>
        <TextInput
          multiline
          maxLength={400}
          onChangeText={handlePostText}
          cursorColor={color}
          onContentSizeChange={(event) => {
            setHeight(event.nativeEvent.contentSize.height);
          }}
          style={{
            fontSize: 16,
            color,

            fontFamily: "mulishMedium",
            minHeight: height,
            alignItems: "flex-start",
          }}
          placeholderTextColor={"grey"}
          placeholder="What's happening?"
        />
      </View>
    </View>
  );
}
