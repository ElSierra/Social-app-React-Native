import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { closeSheet } from "../../../redux/slice/bottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomBackground from "./components/CustomBg";
import DarkModeView from "./components/DarkModeView";
import useGetMode from "../../../hooks/GetMode";

export const BottomSheetContainer = () => {
  const dark = useGetMode();
  const style = dark ? "dark" : "light";
  const BottomSheetState = useAppSelector((state) => state.bottomSheet);
  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["30%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    if (BottomSheetState.isOpen) {
      bottomSheetModalRef.current?.present()
      dispatch(
        closeSheet()
      )
    }
  }, [BottomSheetState?.isOpen]);
  console.log("bottomsheet", BottomSheetState);

  const renderBackdrop = useCallback(
    (props: any) => (
      <>
        <BottomSheetBackdrop
          {...props}
          opacity={0.3}
          pressBehavior={"close"}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      </>
    ),
    []
  );

  // renders
  return (
    // <BottomSheetModal
    //   ref={bottomSheetRef}
    //   index={1}
    //   handleIndicatorStyle={{ display: "none" }}
    //   enablePanDownToClose
    //   snapPoints={snapPoints}
    //   backdropComponent={renderBackdrop}

    //   backgroundComponent={CustomBackground}
    // >
    //   <BottomSheetView style={styles.contentContainer}>

    //     <DarkModeView />
    //   </BottomSheetView>
    // </BottomSheetModal>
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      handleIndicatorStyle={{ display: "none" }}
      backgroundComponent={CustomBackground}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}
    >
      <BottomSheetView style={styles.contentContainer}>
        <DarkModeView />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    borderRadius: 20,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});
