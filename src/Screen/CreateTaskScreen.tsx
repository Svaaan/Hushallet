import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';
import uuid from 'react-native-uuid';
import { ProjectTheme } from '../../theme/theme';
import { RootStackParamList } from '../Navigation/RootNavigator';


type Props = NativeStackScreenProps<RootStackParamList, 'CreateTask'>;

export default function CreateTaskScreen({ navigation }: Props) {
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
    <View style={{ flex: 1, backgroundColor: 'F2F2F2' }}>
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
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'F2F2F2',
        }}
      >
        <ScrollView
          style={{
            flex: 1,
            marginTop: 10,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 20,
          }}
        >
          <Text>Titel:</Text>
          <TextInput
            style={{
              borderRadius: ProjectTheme.borderRadius.large,
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              backgroundColor: '#FFFFFF',
              paddingLeft: 10,
              marginBottom: 10,
            }}
            value={titel}
            onChangeText={(text) => setTitel(text)}
          />
          <Text>Bild:</Text>
          <Button
            style={{
              marginBottom: 10,
              height: 50,
              justifyContent: 'center',
              backgroundColor: ProjectTheme.colors.primary,
            }}
            icon="image"
            mode="contained"
            onPress={pickImage}
            labelStyle={{ color: ProjectTheme.colors.secondary, fontSize: 40 }}
            rippleColor={ProjectTheme.colors.background}
            children={undefined}
          />
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 400,
                height: 225,
                alignSelf: 'center',
                marginBottom: 10,
              }}
            />
          )}
          <Text>Beskrivning:</Text>
          <TextInput
            style={{
              borderRadius: ProjectTheme.borderRadius.large,
              height: 100,
              borderColor: 'gray',
              borderWidth: 1,
              backgroundColor: '#FFFFFF',
              paddingLeft: 10,
              marginBottom: 10,
            }}
            value={discription}
            onChangeText={(text) => setDiscription(text)}
            multiline
            numberOfLines={4}
          />
          <Text>Återkommer:</Text>
          <TextInput
            style={{
              borderRadius: ProjectTheme.borderRadius.large,
              height: 50,
              borderColor: 'gray',
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              paddingLeft: 10,
            }}
            value={interval.toString()}
            onChangeText={(text) => setInterval(text)}
            keyboardType="numeric"
          />
          <Text>Värde:</Text>
          <TextInput
            style={{
              borderRadius: ProjectTheme.borderRadius.large,
              height: 50,
              borderColor: 'gray',
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              paddingLeft: 10,
              marginBottom: 10,
            }}
            value={rating.toString()}
            onChangeText={(text) => setRating(text)}
            keyboardType="numeric"
          />
        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <Button
            style={{
              marginBottom: 5,
              height: 50,
              width: '48%', // Make sure there is enough space for both buttons
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
              elevation: ProjectTheme.elevation.large,
              marginBottom: 5,
              height: 50,
              width: '48%', // Make sure there is enough space for both buttons
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
      </View>
    </View >

    // const styles = StyleSheet.create({
    //   container: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: 'white',
    //   },

    // });


  );
} 
