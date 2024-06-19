import { View, Text, Dimensions, useWindowDimensions, Platform } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AnimatedScreen from "../../components/global/AnimatedScreen";

import HeaderTag from "../../components/discover/HeaderTag";

import { useAppSelector } from "../../redux/hooks/hooks";

import { useState } from "react";

import { BlurView } from "expo-blur";
import useGetMode from "../../hooks/GetMode";
import PagerView from "react-native-pager-view";
import Posts from "./DiscoverScreens/Posts";
import Users from "./DiscoverScreens/Users";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
const renderScene = SceneMap({
  users: Users,
  posts: Posts,
});
const renderTabBar = (props: any) => {
  const dark = useGetMode();
  const backgroundColor = !dark ? "black" : "white";
  const color = !dark ? "black" : "white";
  return (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor }}
      android_ripple={{ color: "transparent" }}
      style={{ backgroundColor: "transparent", elevation: 0, marginTop: 80 }}
      labelStyle={{
        color,
        fontFamily: "mulishRegular",
        textTransform: "none",
      }}
      inactiveColor="grey"
      indicatorContainerStyle={{
        borderRadius: 999,
        width: width / 4,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: width / 5.4,
      }}
    />
  );
};
export default function Discover() {
  const posts = useAppSelector((state) => state.searchPost);
  const dark = useGetMode();
  const tint = dark ? "dark" : "light";
  const persons = useAppSelector((state) => state.searchPeople);
  const { width } = Dimensions.get("window");
  const borderColor = dark ? "#FFFFFF7D" : "#4545452D";
  const [people, setPeople] = useState(true);
  const layout = useWindowDimensions();
  const {top} = useSafeAreaInsets()
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "users", title: "Users" },
    { key: "posts", title: "Posts" },
  ]);
  return (
    <AnimatedScreen style={{ minHeight: height }}>
      {/* <View style={{ flex: 1 }}>
        {people ? <People people={persons} /> : <Posts posts={posts} />}
      </View> */}
      <BlurView
        tint={tint}
          experimentalBlurMethod="dimezisBlurView"
        intensity={100}
        style={{
          position: "absolute",
          height: Platform.select({ios:(129 + (top/2)),android:129}),
          width,
          borderBottomWidth: 0.5,
          borderColor,
        }}
      />

      <TabView
      style={{paddingTop:Platform.select({ios:(top/2),android:0})}}
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        lazy
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      {/* <View
        style={{
          flexDirection: "row",
          gap: 5,
          top: 90,
          position: "absolute",
          borderColor: "black",
          borderStyle: "dashed",
          borderWidth: 1,
          marginBottom: 14,
          zIndex: 999,
          alignItems: "center",
          borderRadius: 90,
          overflow: "hidden",
          marginLeft: 15,
          padding: 10,

          backgroundColor: "transparent",
        }}
      >
        <BlurView
          tint={tint}
          intensity={100}
          style={{ position: "absolute", height: 80, width: 150 }}
        />
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
      </View> */}
    </AnimatedScreen>
  );
}
