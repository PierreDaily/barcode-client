import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import API from "../api";
import logger from "../../../logger";
import { optimalPictureSize } from "../utils";
import Spinner from "react-native-loading-spinner-overlay";
import { addPriceState } from "../../../atoms";
import { useSetRecoilState } from "recoil";

export function CapturePhoto({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const type = Camera.Constants.Type.back;
  const [pictureSize, setPictureSize] = useState(null);
  const [cameraRdy, setCameraStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setPriceInfo = useSetRecoilState(addPriceState);
  let isFocused = useIsFocused();
  const camera = useRef(null);

  const { barcode, type: barcodeType, brand, name } = route.params;

  useEffect(() => {
    if (hasPermission && cameraRdy) {
      (async () => {
        try {
          const fetchSizes = await camera.current.getAvailablePictureSizesAsync(
            "4:3"
          );
          setPictureSize(optimalPictureSize(fetchSizes));
        } catch (err) {
          logger(err);
        }
      })();
    }
  }, [cameraRdy, hasPermission]);

  const takePhoto = async () => {
    try {
      setIsLoading(true);
      const { uri } = await camera.current.takePictureAsync({
        quality: 0.5
      });

      const { id: itemId } = await API.postItem({
        barcode,
        barcodeType,
        brand,
        name,
        imgUri: uri
      });

      setIsLoading(false);
      setPriceInfo(priceInfo => ({ ...priceInfo, itemId }));
      navigation.navigate("Item-saved");
    } catch (err) {
      setIsLoading(false);
      logger(err);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.main}>
      <Spinner visible={isLoading} textContent={"Loading..."} />
      {isFocused && (
        <Camera
          style={styles.camera}
          type={type}
          ref={camera}
          onCameraReady={() => setCameraStatus(true)}
          pictureSize={pictureSize}
        ></Camera>
      )}
      <View
        style={{
          flex: 1,
          backgroundColor: "transparent",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
          <Text style={styles.cameraButton__text}> {" Take Photo"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 4
  },
  cameraButton: {
    flex: 0.5,
    alignSelf: "flex-end",
    alignItems: "center"
  },
  cameraButton__text: {
    fontSize: 18,
    marginBottom: 10,
    color: "black"
  },
  main: {
    flex: 1
  }
});

CapturePhoto.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }),
  route: PropTypes.shape({ params: PropTypes.object })
};
