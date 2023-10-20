import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ImagePicker from "expo-image-picker";
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';
import uuid from 'react-native-uuid';
import { ProjectTheme } from '../../theme/theme';
import { RootStackParamList } from '../Navigation/RootNavigator';


type Props = NativeStackScreenProps<RootStackParamList, 'Task'>;

export default function TaskScreen({ navigation }: Props) {
  const slectedHomeId = React.useRef<string>('1'); // Ref to store the selected home id
  const [titel, setTitel] = React.useState('');
  const [discription, setDiscription] = React.useState('');
  const [interval, setInterval] = React.useState('');
  const [rating, setRating] = React.useState('');
  const [image, setImage] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handelAddTask = async () => {
    try {
      const taskData = {
        id: uuid.v4(),
        SlectedHomeId: slectedHomeId.current,
        Titel: titel,
        imageUri: image,
        Discription: discription,
        Interval: parseInt(interval, 10),
        Rating: parseInt(rating, 10),
      };

      await AsyncStorage.setItem(
        taskData.id as string,
        JSON.stringify(taskData)
      );
      console.log(taskData);
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ backgroundColor: 'F2F2F2' }}>
      <View
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            paddingTop: 14,
            justifyContent: 'center',
            alignContent: 'center',
            height: 66,
          }}
        >
          Skapa en ny syssla
        </Text>
      </View>
      <View
        style={{
          height: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: 'F2F2F2',
        }}
      />
      <ScrollView
        style={{
          marginTop: 10,
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 20,
        }}
      >
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            backgroundColor: '#FFFFFF',
            paddingLeft: 10,
          }}
          placeholder="Titel"
          value={titel}
          onChangeText={(text) => setTitel(text)}
        />
        <Button
          style={{
            marginBottom: 5,
            height: 50,
            justifyContent: 'center',
            backgroundColor: ProjectTheme.colors.primary,
          }}
          icon="file-image-plus-outline"
          mode="contained"
          onPress={pickImage}
          labelStyle={{ color: ProjectTheme.colors.secondary }}
          rippleColor={ProjectTheme.colors.background}
          children={undefined}
        />
        <TextInput
          style={{
            height: 100,
            borderColor: 'gray',
            borderWidth: 1,
            backgroundColor: '#FFFFFF',
            paddingLeft: 10,
          }}
          placeholder="Beskrivning"
          value={discription}
          onChangeText={(text) => setDiscription(text)}
          multiline
          numberOfLines={4}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            paddingLeft: 10,
          }}
          placeholder="Återkommer:"
          value={interval.toString()} // Convert to string
          onChangeText={(text) => setInterval(text)}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            paddingLeft: 10,
          }}
          placeholder="Värde:"
          value={rating.toString()} // Convert to string
          onChangeText={(text) => setRating(text)}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 20,
          }}
        >
          <Button
            style={{
              marginBottom: 5,
              height: 50,
              justifyContent: 'center',
              backgroundColor: ProjectTheme.colors.primary,
            }}
            icon="content-save"
            mode="contained"
            onPress={handelAddTask}
            labelStyle={{ color: ProjectTheme.colors.secondary }}
            rippleColor={ProjectTheme.colors.background}
          >
            Spara
          </Button>
          <Button
            style={{
              marginBottom: 5,
              height: 50,
              justifyContent: 'center',
              backgroundColor: ProjectTheme.colors.primary,
            }}
            icon="file-image-plus-outline"
            mode="contained"
            onPress={() => navigation.navigate('Profile')}
            labelStyle={{ color: ProjectTheme.colors.secondary }}
            rippleColor={ProjectTheme.colors.background}
          >
            Stäng
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//   },

// });
