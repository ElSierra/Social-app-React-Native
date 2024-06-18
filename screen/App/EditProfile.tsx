import { View, Text, Pressable, BackHandler } from "react-native";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import { Image } from "expo-image";
import { useAppSelector } from "../../redux/hooks/hooks";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";
import useGetMode from "../../hooks/GetMode";
import EditContent from "../../components/editProfile/EditContent";
import Profile from "./Profile";
import {
  CloseCircleIcon,
  Eye,
  LockIcon,
  ProfileIcon,
  TrashIcon,
  UserNameIcon,
} from "../../components/icons";
import { EditProfileProp } from "../../types/navigation";
import { DeleteAccountModal } from "./ChangeData/DeleteAccountModal";
import { useEffect, useState } from "react";
import { UploadPhotoModal } from "../../components/profile/UploadPhotoModal";

export default function EditProfile({ navigation }: EditProfileProp) {
  const user = useAppSelector((state) => state.user);
  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const style = dark ? "light" : "dark";
  const changeColor = dark ? "#F0F8FF" : "blue";
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const handleSetOpen = () => {
    setIsOpenProfile(false);
  };

  const isHighEndDevice = useAppSelector((state) => state?.prefs?.isHighEnd);

  return (
    <>
      <StatusBar animated={true} style={style} backgroundColor="transparent" />
      <UploadPhotoModal isOpen={isOpenProfile} closeModal={handleSetOpen} />
      <DeleteAccountModal closeModal={closeModal} isOpen={isOpen} />
      <AnimatedScreen style={{ alignItems: "center", marginTop: 100 }}>
        <Pressable
          onPress={() => {
            setIsOpenProfile(true);
          }}
        >
          <View
            style={{
              height: 120,
              width: 120,
              padding: 5,
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 999,
            }}
          >
            {isHighEndDevice && (
              <BlurView
                experimentalBlurMethod="dimezisBlurView"
                style={{ height: 150, width: 150, position: "absolute" }}
              />
            )}
            {user?.data?.imageUri ? (
              <Image
                source={{ uri: user?.data?.imageUri }}
                style={{ height: "100%", width: "100%", borderRadius: 9999 }}
              />
            ) : (
              <ProfileIcon size={"110%"} color={color} />
            )}
          </View>
        </Pressable>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text
            style={{
              fontFamily: "jakaraBold",
              fontSize: 30,
              height: 40,
              color,
            }}
          >
            {user?.data?.name}
          </Text>
          <Text
            style={{ fontFamily: "jakara", includeFontPadding: false, color }}
          >
            @{user?.data?.userName}
          </Text>
        </View>
        <View style={{ width: "100%", padding: 20, gap: 10 }}>
          <EditContent
            onPress={() => {
              navigation.push("ChangeData", { change: "userName" });
            }}
            text="Change Username"
            Icon={UserNameIcon}
            color={changeColor}
          />
          <EditContent
            text="Change name"
            Icon={UserNameIcon}
            color={changeColor}
            onPress={() => {
              navigation.push("ChangeData", { change: "name" });
            }}
          />
          <EditContent
            text="Change password"
            Icon={LockIcon}
            color="red"
            onPress={() => {
              navigation.push("ChangeData", { change: "password" });
            }}
          />
        </View>

        <View style={{ position: "absolute", bottom: 20 }}>
          <EditContent
            onPress={() => setIsOpen(true)}
            text="Delete Account"
            Icon={CloseCircleIcon}
            color="red"
          />
        </View>
      </AnimatedScreen>
    </>
  );
}
