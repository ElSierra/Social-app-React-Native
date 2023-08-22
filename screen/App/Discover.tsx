import { View, Text } from "react-native";

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

export default function Discover() {
  const posts = useAppSelector((state) => state.searchPost);
  
  const persons = useAppSelector((state) => state.searchPeople);
  console.log("🚀 ~ file: Discover.tsx:21 ~ Discover ~ persons:", persons)
  const [people, setPeople] = useState(true);

  return (
    <AnimatedScreen>
      <View style={{ flex: 1, paddingTop: 100, padding: 10 }}>
        <View style={{ flexDirection: "row", gap: 5 }}>
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
        {people ? <People people={persons} /> : <Posts posts={posts} />}
      </View>
    </AnimatedScreen>
  );
}
