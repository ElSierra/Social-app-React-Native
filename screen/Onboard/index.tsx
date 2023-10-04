import {
  View,
  Text,
  Dimensions,
  Pressable,
  ScrollView,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import OnboardBuilder from "./components/OnboardBuilder";
import TrackerTag from "./components/TrackerTag";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { setRoute } from "../../redux/slice/routes";
import { murphyLaws } from "../../data/murphy";
import useGetMode from "../../hooks/GetMode";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;


export default function Onboard() {
  const [page, setPage] = useState(0);
  const size = useSharedValue(55);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(size.value, [55, 60], [55, 60]),
      height: interpolate(size.value, [55, 60], [55, 60]), // map opacity value to range between 0 and 1
    };
  });

  useEffect(() => {
    size.value = withRepeat(withTiming(60, { duration: 500 }), -1, true);
    return () => {
      cancelAnimation(size);
    };
  }, []);


  const dark = useGetMode();
  const isDark = dark;
  const color = isDark ? "black" : "white";
  const backgroundColor = isDark ? "white" : "black";
  const dispatch = useAppDispatch();
  const firstPage = (Math.random() * 2).toFixed();
  const secondPage = () => {
    if (Number(firstPage) === 2) {
      return Number(firstPage) - 1;
    } else {
      return Number(firstPage) + 1;
    }
  };
  return (
    <View
      style={{
        flex: 1,
        marginTop: height * 0.2,
        paddingHorizontal: 20,
        paddingVertical: height * 0.04,
        justifyContent: "space-between",
      }}
    >
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={(e) => {
          const x = e.nativeEvent.contentOffset.x;
          if (x <= width / 2) {
            setPage(0);
          } else {
            setPage(1);
          }
        }}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        style={{ width }}
        decelerationRate={"fast"}
      >
        <OnboardBuilder
          header="Welcome to QuickPost"
          subText="Post to inspire"
          imageUri={require("../../assets/images/move.png")}
          quote={murphyLaws[Number(firstPage)]}
        />
        <OnboardBuilder
          header={"Explore the \nnew world"}
          subText="to your desire"
          imageUri={require("../../assets/images/phone.png")}
          quote={murphyLaws[Number(secondPage())]}
        />
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          height: 70,
          width: "100%",
          alignItems: "center",
          backgroundColor: "transparent",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", gap: 5 }}>
          <TrackerTag />
          {page === 1 ? (
            <TrackerTag />
          ) : (
            <TrackerTag key="3" color={!isDark ? "#0000002A" : "#676767CC"} />
          )}
        </View>
        <View
          style={{
            height: 70,
            width: 70,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animated.View
            style={[
              {
                borderRadius: 9999,
                height: 60,
                width: 60,
                backgroundColor,
                overflow: "hidden",
              },
              animatedStyle,
            ]}
          >
            <Pressable
              android_ripple={{
                foreground: true,
                color: isDark ? "#65131357" : "#FFFFFFAF",
              }}
              onPress={() => {
                dispatch(setRoute({ route: "Auth" }));
              }}
              style={{
                height: "100%",
                width: "100%",

                borderRadius: 9999,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="chevron-forward" size={35} color={color} />
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
