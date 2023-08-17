import {
  View,
  Text,
  Pressable,
  Platform,
  PermissionsAndroid,
  FlatList,
  Dimensions,
  Keyboard,
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
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Image } from "expo-image";
import PickImageButton from "../../components/postContent/PickImageButton";
import VideoTextArea from "../../components/postContent/VideoTextArea";
import RingAudio from "../../components/home/post/components/RingAudio";
import Lottie from "lottie-react-native";
import PickAudioButton from "../../components/postContent/PickAudioButton";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { ActivityIndicator } from "react-native-paper";
import {
  usePostContentMutation,
  useUploadPhotoMutation,
} from "../../redux/api/services";
import { openToast } from "../../redux/slice/toast/toast";
import {
  closeLoadingModal,
  openLoadingModal,
} from "../../redux/slice/modal/loading";
import PickVideoButton from "../../components/postContent/PickVideoButton";
const width = Dimensions.get("screen").width;
export default function PostContent({ navigation }: PostContentProp) {
  const dark = useGetMode();
  const dispatch = useAppDispatch();
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
  const token = useAppSelector((state) => state.user?.token);
  function handleSetPhotoPost(mimeType: string, uri: string, size: number) {
    setPostPhoto({
      mimeType,
      uri,
      size,
    });
    setPostAudio(null);
  }
  const [fileToServer, setFTServer] = useState<string | undefined>(undefined);
  const [postText, setPostText] = useState<string | undefined>(undefined);
  const [done, setDone] = useState(false);
  console.log('',postPhoto);

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
  const [photo] = useUploadPhotoMutation();
  const [postContent] = usePostContentMutation();
  useMemo(() => {
    setDone(false);
    if (postPhoto?.mimeType.startsWith("image/")) {
      const blob: any = {
        name: "photo.jpg",
        type: postPhoto.mimeType,
        uri: postPhoto.uri,
      };
      const formData = new FormData();

      formData.append("photos", blob);
      console.log(
        "🚀 ~ file: PostContent.tsx:161 ~ useEffect ~ formData:",
        formData
      );
      photo(formData)
        .unwrap()
        .then((r) => {
          console.log("🚀 ~ file: PostContent.tsx:166 ~ photo ~ r:", r);
          setDone(true);
          setFTServer(r.photo);
        })
        .catch((e) => {
          setDone(true);
          console.log(e);
          dispatch(openToast({ text: "Photo didn't upload", type: "Failed" }));
        });
      // axios
      //   .post(
      //     `${process.env.EXPO_PUBLIC_API_URL}/api/services/upload-photos` as string,
      //     formData,
      //     {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //         Authorization: `Bearer ${token}`,
      //       },
      //     }
      //   )
      //   .then((response) => {
      //     setDone(true);
      //     setFTServer(response.data?.photo);
      //   })
      //   .catch((error) => {
      //     // handle errors
      //     console.log(error);
      //   });
    }
  }, [postPhoto]);

  const handlePostText = (text: string) => {
    setPostText(text);
  };

  const handlePostContent = () => {
    Keyboard.dismiss();
    if (postPhoto?.mimeType.startsWith("image/")) {
      if (fileToServer) {
        dispatch(openLoadingModal());
        postContent({ photoUri: [fileToServer], postText })
          .then((e) => {
            dispatch(
              openToast({ text: "Successfully posted", type: "Success" })
            );
            navigation.pop();
            dispatch(closeLoadingModal());
          })
          .catch((e) => {
            dispatch(openToast({ text: "Post failed ", type: "Failed" }));
            dispatch(closeLoadingModal());
          });
      }
    }
  };

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
          <PostButton
            isDisabled={!done}
            isLoading={!done}
            onPress={handlePostContent}
          />
        </View>
        <TextArea handlePostText={handlePostText} />
        <View
          style={{
            height: 200,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {(postAudio || postPhoto) && (
            <View
              style={{
                height: 30,
                width: 30,
                position: "absolute",
                zIndex: 999,
                top: 0,

                right: 0,
                padding: 20,
                borderRadius: 9999,
                overflow: "hidden",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pressable
                onPress={() => {
                  setFTServer(undefined);
                  setPostAudio(null);
                  setPostPhoto(null);
                }}
                style={{
                  flex: 1,
                  borderRadius: 9999,
                  backgroundColor: "red",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                android_ripple={{ color: "white", foreground: true }}
              >
                <CloseCircleIcon size={30} color={"red"} />
              </Pressable>
            </View>
          )}
          {!done && (
            <View
              style={{
                position: "absolute",
                zIndex: 999,
                left: 0,
                right: 0,
                top: 0,
                justifyContent: "center",
                alignItems: "center",
                bottom: 0,
              }}
            >
              {<ActivityIndicator size={40} color="white" />}
            </View>
          )}
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
                <PickVideoButton handleSetPhotoPost={handleSetPhotoPost} />
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
