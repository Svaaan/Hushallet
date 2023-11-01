import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Chore, mockChores } from '../../data/mockedChores';
import { ProjectTheme } from '../../theme/theme';
import ChoresRating from '../Component/ChoresRating';
import Intervals from '../Component/Interval';
import { RootStackParamList } from '../Navigation/RootNavigator';
type Props = NativeStackScreenProps<RootStackParamList, 'CreateChore'>;

export default function CreateChoreScreen({ navigation }: Props) {
  const slectedHomeId = React.useRef<string>('1'); // Ref to store the selected home id
  const [titel, setTitel] = React.useState('');
  const [Discription, setDiscription] = React.useState('');
  const [Interval, setInterval] = React.useState('');
  const [Rating, setRating] = React.useState('');
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
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

  const handelAddChore = async () => {
    try {
      const intervalValue = parseInt(Interval, 10);

      if (isNaN(intervalValue)) {
        console.error('Interval is not a valid number');
        return;
      }

      const newChore: Chore = {
        id: mockChores.length + 1,
        home_id: parseInt(slectedHomeId.current, 10),
        name: titel,
        description: Discription,
        chore_rating: parseInt(Rating, 10),
        interval: intervalValue,
      };

      mockChores.push(newChore);

      setTitel('');
      setDiscription('');
      setInterval('');
      setRating('');
      setImage(null);

      navigation.navigate('Household');

      console.log(mockChores);
    } catch (error) {
      console.log(error);
    }
  };

  const nameStyle = {
    width: '100%',
    height: 40,
    backgroundColor: ProjectTheme.inputBackground,
    borderRadius: ProjectTheme.borderRadius.medium,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    marginBottom: 20,
    color: ProjectTheme.colors.textcolor,
    elevation: ProjectTheme.elevation.small,
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'F2F2F2' }}>
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
          <TextInput
            style={{
              borderRadius: ProjectTheme.borderRadius.large,
              height: 40,

              elevation: ProjectTheme.elevation.small,
              backgroundColor: '#FFFFFF',
              paddingLeft: 10,
              marginBottom: 10,
            }}
            value={titel}
            placeholder="Titel"
            onChangeText={(text) => setTitel(text)}
          />
          <Text> </Text>
          <TextInput
            placeholder="Beskrivning"
            style={{
              borderRadius: ProjectTheme.borderRadius.large,
              height: 100,
              elevation: ProjectTheme.elevation.small,
              backgroundColor: '#FFFFFF',
              paddingLeft: 10,
              marginBottom: 10,
            }}
            value={Discription}
            onChangeText={(text) => setDiscription(text)}
            multiline
            numberOfLines={4}
          />
          <Text></Text>
          <Intervals
            selectedInterval={parseInt(Interval, 10)}
            onIntervalChange={(value) => setInterval(value.toString())}
          />
          <Text></Text>
          <ChoresRating
            selectedRating={parseInt(Rating, 10)}
            onRatingChange={(value) => setRating(value.toString())}
          />
          <Text> </Text>
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
              width: '48%',
              justifyContent: 'center',
              backgroundColor: ProjectTheme.colors.primary,
            }}
            icon="content-save-outline"
            mode="contained"
            onPress={handelAddChore}
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
            icon="close"
            mode="contained"
            onPress={() => navigation.navigate('Household')}
            labelStyle={{ color: ProjectTheme.colors.secondary }}
            rippleColor={ProjectTheme.colors.background}
          >
            Stäng
          </Button>
        </View>
      </View>
    </View>
  );
}
