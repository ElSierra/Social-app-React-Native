import { View, Text, Dimensions } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import PeopleContainer from "../../components/discover/PeopleContainer";
import HeaderTag from "../../components/discover/HeaderTag";
import PostsContainer from "../../components/discover/PostsContainer";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useGetRandomPostsQuery } from "../../redux/api/services";
import { useAppSelector } from "../../redux/hooks/hooks";
import { SearchSkeleton } from "../../components/discover/Skeleton/SearchSkeleton";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useState } from "react";
import People from "../../components/discover/Page/People";
import Posts from "../../components/discover/Page/Posts";
import { BlurView } from "expo-blur";
import useGetMode from "../../hooks/GetMode";

const { width } = Dimensions.get("screen");
export default function Discover() {
  const posts = useAppSelector((state) => state.searchPost);
  const dark = useGetMode();
  const tint = dark ? "dark" : "light";
  const persons = useAppSelector((state) => state.searchPeople);

  const [people, setPeople] = useState(true);

  return (
    <AnimatedScreen>
      <View style={{ flex: 1 }}>
        {people ? <People people={persons} /> : <Posts posts={posts} />}
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          top: 90,
          position: "absolute",
          borderColor: "black",
          borderStyle: "dashed",
          borderWidth: 1,
          marginBottom: 14,
       
          alignItems: "center",
          borderRadius: 90,
          overflow: "hidden",
          marginLeft: 15,
          padding: 10,

          backgroundColor: "transparent",
        }}
      >
        <BlurView tint={tint}  style={{position:"absolute",height:80,width:150,}}/>
        <HeaderTag
          onPress={() => setPeople(true)}
          text="People"
          selected={people}
        />
        <HeaderTag
          onPress={() => setPeople(false)}
          text="Posts"
          selected={!people}
        />
      </View>
    </AnimatedScreen>
  );
}
