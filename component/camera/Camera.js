import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import API from "../api/api";
import logger from "../../logger";
import { optimalPictureSize } from "./utils";

export default function CapturePhoto({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const type = Camera.Constants.Type.back;
  const [pictureSize, setPictureSize] = useState(null);
  const [cameraRdy, setCameraStatus] = useState(false);
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

    return API.post(`/item`, data, {
      "content-type": `multipart/form-data`
    })
      .then(() => navigation.navigate("Item-saved"))
      .catch(err => logger(err));
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
    <View style={{ flex: 1 }}>
      {isFocused && (
        <Camera
          style={{ flex: 4 }}
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
        <TouchableOpacity
          style={{
            flex: 0.5,
            alignSelf: "flex-end",
            alignItems: "center"
          }}
          onPress={takePhoto}
        >
          <Text style={{ fontSize: 18, marginBottom: 10, color: "black" }}>
            {" "}
            {" Take Photo"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

CapturePhoto.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }),
  route: PropTypes.shape({ params: PropTypes.object })
};
