import { View, Text, useColorScheme } from "react-native";
import React from "react";
import { VerifiedIcon } from "../../../icons";
import useGetMode from "../../../../hooks/GetMode";

export default function NameAndTagFullScreen({
  name,
  verified,

  userTag,
}: {
  name: string;

  verified: boolean;
  userTag: string;
}) {
  const dark = useGetMode();
  const isDark = dark;
  const color = isDark ? "white" : "black";
  const backgroundColor = isDark ? "white" : "black";
  return (
    <View>
      <View style={{ gap: 0 }}>
        <View style={{flexDirection:"row",gap:2,alignItems:"center"}}>
          <Text
            style={{
              fontFamily: "jakaraBold",
              includeFontPadding: false,
              fontSize: 20,
              color,
            }}
          >
            {name}
          </Text>
          {verified && <VerifiedIcon color="green" size={20} />}
        </View>

        <Text
          style={{
            fontFamily: "jakara",
            includeFontPadding: false,
            color: "#7a868f",
            fontSize: 16,
            marginBottom: 6,
          }}
        >
          @{userTag}
        </Text>
      </View>
    </View>
  );
}
