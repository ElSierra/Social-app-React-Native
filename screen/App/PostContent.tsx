import {
  View,
  Text,
  Pressable,
  Platform,
  PermissionsAndroid,
  FlatList,
  Dimensions,
} from "react-native";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import { CameraIcon, CloseCircleIcon } from "../../components/icons";
import PostButton from "../../components/postContent/PostButton";
import useGetMode from "../../hooks/GetMode";
import TextArea from "../../components/postContent/TextArea";
import { PostContentProp } from "../../types/navigation";

import {
  CameraRoll,
  PhotoIdentifier,
} from "@react-native-camera-roll/camera-roll";
import { useEffect, useRef, useState } from "react";
import { Image } from "expo-image";
import PickImageButton from "../../components/postContent/PickImageButton";
import VideoTextArea from "../../components/postContent/VideoTextArea";
import RingAudio from "../../components/home/post/components/RingAudio";
import Lottie from "lottie-react-native";
import PickAudioButton from "../../components/postContent/PickAudioButton";
const width = Dimensions.get("screen").width;
export default function PostContent({ navigation }: PostContentProp) {
  const dark = useGetMode();
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
  const [postPhoto, setPostPhoto] = useState<{
    mimeType: string;
    uri: string;
    size: number;
  } | null>(null);
  const [postAudio, setPostAudio] = useState<{
    mimeType: string;
    uri: string;
    size: number;
  } | null>(null);
  const backgroundColor = dark ? "white" : "black";
  const animationRef = useRef<Lottie>(null);

  function handleSetPhotoPost(mimeType: string, uri: string, size: number) {
    console.log(
      "🚀 ~ file: PostContent.tsx:46 ~ handleSetPhotoPost ~ uri:",
      uri
    );
    setPostPhoto({
      mimeType,
      uri,
      size,
    });
    setPostAudio(null);
  }

  function handleSetAudioPost(mimeType: string, uri: string, size: number) {
    setPostAudio({
      mimeType,
      uri,
      size,
    });
    setPostPhoto(null);
  }
  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (Number(Platform.Version) >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if (Number(Platform.Version) >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          (statuses) =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        ).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  }

  useEffect(() => {
    async function getPicture() {
      if (Platform.OS === "android" && !(await hasAndroidPermission())) {
        return;
      }

      CameraRoll.getPhotos({
        first: 20,
        assetType: "Photos",
      })
        .then((r) => {
          setPhotos(r.edges);
        })
        .catch((err) => {
          //Error Loading Images
        });
    }
    getPicture();
  }, []);

  useEffect(() => {
    if (postAudio) {
      animationRef.current?.play();
    }

    return () => {
      animationRef.current?.pause;
    };
  }, [postAudio]);
  return (
    <AnimatedScreen>
      <View style={{ flex: 1, padding: 20, marginTop: 30 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 9999,
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pressable
              onPress={() => {
                navigation.pop();
              }}
              style={{
                flex: 1,
                borderRadius: 9999,
                justifyContent: "center",
                alignItems: "center",
              }}
              android_ripple={{ color: backgroundColor, foreground: true }}
            >
              <CloseCircleIcon size={30} color={backgroundColor} />
            </Pressable>
          </View>
          <PostButton />
        </View>
        <TextArea />
        <View
          style={{
            height: 200,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {postPhoto && (
            <Image
              style={{ width: "100%", height: "100%", borderRadius: 20 }}
              source={{ uri: postPhoto?.uri }}
              contentFit="cover"
              transition={1000}
            />
          )}
          {postAudio && <RingAudio animationRef={animationRef} />}
        </View>

        {postPhoto?.mimeType === "video/mp4" && <VideoTextArea />}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            flexDirection: "row",
            gap: 10,
            width,
            marginBottom: 20,
          }}
        >
          <FlatList
            horizontal
            ListHeaderComponent={
              <View style={{ flexDirection: "row", gap: 10 }}>
                <PickImageButton handleSetPhotoPost={handleSetPhotoPost} />
                <PickAudioButton handleSetAudioPost={handleSetAudioPost} />
              </View>
            }
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10, paddingLeft: 10 }}
            data={photos}
            renderItem={({ item }) => (
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <Pressable
                  android_ripple={{ color: "#FFFFFF", foreground: true }}
                  style={{ borderRadius: 10 }}
                  onPress={() => {
                    setPostPhoto({
                      uri: item?.node?.image?.uri,
                      mimeType: item?.node?.type,
                      size: item?.node?.image?.fileSize || 0,
                    });
                  }}
                >
                  <Image
                    style={{ height: 100, width: 100, borderRadius: 10 }}
                    source={{ uri: item?.node?.image?.uri }}
                  />
                </Pressable>
              </View>
            )}
          />
        </View>
      </View>
    </AnimatedScreen>
  );
}
