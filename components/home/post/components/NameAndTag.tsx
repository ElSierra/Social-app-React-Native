import { View, Text, useColorScheme } from "react-native";
import React from "react";
import { VerifiedIcon } from "../../../icons";
import useGetMode from "../../../../hooks/GetMode";

export default function NameAndTag({
  name,
  verified,
  dateAgo,
  userTag,
}: {
  name: string;
  dateAgo?:string;
  verified: boolean;
  userTag: string;
}) {
  const dark = useGetMode();
  const isDark = dark;
  const color = isDark ? "white" : "black";
  return (
    <View>
      <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "jakaraBold",
            includeFontPadding: false,
            fontSize: 14,
            color,
          }}
        >
          {name}
        </Text>
        {verified && <VerifiedIcon color="green" size={16} />}
        <Text
          style={{
            fontFamily: "jakara",
            includeFontPadding: false,
            color: "#7a868f",
            fontSize: 14,
            marginBottom: 2,
          }}
        >
          @{userTag}
        </Text>
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",gap:2}}>
          <View style={{backgroundColor:  "#7a868f", height:4,width:4, borderRadius:9999}}/>
          <Text style={{color:  "#7a868f"}}>{dateAgo}</Text>
          
        </View>
      </View>
    </View>
  );
}
