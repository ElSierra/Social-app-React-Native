import React, { ReactNode, useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { closeSheet } from "../../../redux/slice/bottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomBackground from "./components/CustomBg";
import DarkModeView from "./components/DarkModeView";
import useGetMode from "../../../hooks/GetMode";

export const BottomSheetContainer = ({ children }: { children: ReactNode }) => {
  const dark = useGetMode();
  const style = dark ? "dark" : "light";
  const BottomSheetState = useAppSelector((state) => state.bottomSheet);
  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["30%"], []);

  if (BottomSheetState.isOpen) {
    bottomSheetRef.current?.snapToIndex(0);
  }

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      dispatch(closeSheet());
    }
  }, []);

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {children}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          handleIndicatorStyle={{ display: "none" }}
          enablePanDownToClose
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          onChange={handleSheetChanges}
          backgroundComponent={CustomBackground}
        >
          <BottomSheetView style={styles.contentContainer}>
            
            <DarkModeView />
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
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
