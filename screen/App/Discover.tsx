import { View, Text } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import PeopleContainer from "../../components/discover/PeopleContainer";

export default function Discover() {
  const isFocused = useIsFocused();
  return (
    <AnimatedScreen>
      <View style={{ flex: 1, paddingTop: 100, padding: 10 }}>
        <View
          style={{
            padding: 10,
            borderColor: "black",
            width: 80,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor: "black",
            borderRadius: 60,
          }}
        >
          <Text
            style={{ fontFamily: "jakaraBold", fontSize: 16, color: "white" }}
          >
            People
          </Text>
        </View>
        <View style={{ gap: 5, marginVertical: 20 }}>
          <PeopleContainer />
          <PeopleContainer />
          <PeopleContainer />
        </View>

        <Text style={{ fontFamily: "jakaraBold", fontSize: 24 }}>Posts</Text>
      </View>
    </AnimatedScreen>
  );
}
