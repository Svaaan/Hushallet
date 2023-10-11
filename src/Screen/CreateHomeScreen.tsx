import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation/Navigation";

type Props = NativeStackScreenProps<RootStackParamList, "CreateHome">;

export default function CreateHomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>Create Home Screen</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", 
    backgroundColor: "white",
  },
});
