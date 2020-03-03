import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Vibration } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useIsFocused } from "@react-navigation/native";

export default function BarCodeScan({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const barcodeKeys = Object.keys(BarCodeScanner.Constants.BarCodeType);
    const standardType = barcodeKeys
      .filter(key => BarCodeScanner.Constants.BarCodeType[key] === type)
      .shift();
    Vibration.vibrate([0, 200, 0]);
    navigation.navigate("Item-details", { barcode: data, type: standardType });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end"
      }}
    >
      {isFocused && (
        <BarCodeScanner
          barCodeTypes={[
            BarCodeScanner.Constants.BarCodeType.ean13,
            BarCodeScanner.Constants.BarCodeType.ean8
          ]}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}
