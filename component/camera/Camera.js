import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import Const from "../../const";
const { serverAddress, serverPort } = Const;
import logger from "../../logger";
import { findOptimalPictureSize } from "./utils";

export default function CapturePhoto({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [pictureSize, setPictureSize] = useState(null);
  const [cameraRdy, setCameraStatus] = useState(false);
  isFocused = useIsFocused();
  const camera = useRef(null);

  const { barcode, type: barcodeType, brand, name } = route.params;

  useEffect(() => {
    if (hasPermission && cameraRdy) {
      (async () => {
        try {
          const fetchSizes = await camera.current.getAvailablePictureSizesAsync(
            "4:3"
          );
          setPictureSize(findOptimalPictureSize(fetchSizes));
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

    return axios
      .post(`http://${serverAddress}:${serverPort}/item`, data)
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
          style={{ flex: 1 }}
          type={type}
          ref={camera}
          onCameraReady={() => setCameraStatus(true)}
          pictureSize={pictureSize}
        >
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
                flex: 0.1,
                alignSelf: "flex-end",
                alignItems: "center"
              }}
              onPress={takePhoto}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                {" "}
                {" Take Photo"}
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}
