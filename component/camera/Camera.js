import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import axios from "axios";
import Const from "../../const";
const { serverAddress, serverPort } = Const;
import useScreenFocus from "../hook/useScreenFocus";

export default function CapturePhoto({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const screenFocus = useScreenFocus(navigation);
  const camera = useRef(null);

  const { barcode, type: barcodeType, brand, name } = route.params;

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
      .catch(err => console.log(err));
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
      {screenFocus && (
        <Camera style={{ flex: 1 }} type={type} ref={camera}>
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: "flex-end",
                alignItems: "center"
              }}
              onPress={() => {
                camera.current
                  .takePictureAsync()
                  .then(result => savePhoto(result.uri));
              }}
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
