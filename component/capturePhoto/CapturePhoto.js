import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import API from "../api/api";
import logger from "../../logger";
import { optimalPictureSize } from "./utils";
import Spinner from "react-native-loading-spinner-overlay";

export default function CapturePhoto({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const type = Camera.Constants.Type.back;
  const [pictureSize, setPictureSize] = useState(null);
  const [cameraRdy, setCameraStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      const { uri } = await camera.current.takePictureAsync({
        quality: 0.5
      });
      savePhoto(uri);
    } catch (err) {
      logger(err);
    }
  };

  const savePhoto = imgUri => {
    let data = new FormData();
    data.append("image", {
      uri: imgUri,
      name: "image.jpg",
      type: "image/jpeg"
    });
    data.append("barcode", barcode);
    data.append("barcode_type", barcodeType);
    data.append("name", name);
    data.append("brand", brand);
    setIsLoading(true);

    return API.post(`/item`, data, {
      "content-type": `multipart/form-data`
    })
      .then(() => {
        setIsLoading(false);
        navigation.navigate("Item-saved");
      })
      .catch(err => {
        setIsLoading(false);
        logger(err);
      });
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
