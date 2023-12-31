import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Chore } from '../../data/mockedChores';
import { ProjectTheme } from '../../theme/theme';
import ChoresRating from '../Component/ChoresRating';
import { default as Intervals } from '../Component/Interval';
import { useChoresContext } from '../Context/ChoressContext';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'EditChore'>;

export default function EditChoreScreen({ route, navigation }: Props) {
  const { getChoreById, editChore } = useChoresContext();
  const choreId: number = route.params.choreId;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [interval, setInterval] = useState('');
  const [rating, setRating] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [chore, setChore] = useState<Chore | null>(null);

  useEffect(() => {
    if (choreId) {
      const fetchedChore = getChoreById(choreId);
      setChore(fetchedChore);
      setTitle(fetchedChore.name);
      setDescription(fetchedChore.description);
      setInterval(fetchedChore.interval.toString());
      setRating(fetchedChore.chore_rating.toString());
      setImage(fetchedChore.imageUri || null);
    }
  }, [choreId]);

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

  const handleEditChore = async () => {
    if (!chore) {
      return;
    }

    const editedChore: Chore = {
      ...chore,
      name: title,
      description,
      interval: parseInt(interval, 10),
      chore_rating: parseInt(rating, 10),
    };

    editChore(editedChore);

    navigation.navigate('Household');
    console.log(chore);
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
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
            }}
          >
            Titel:
          </Text>
          <TextInput
            style={{
              borderRadius: ProjectTheme.borderRadius.large,
              height: 40,

              elevation: ProjectTheme.elevation.small,
              backgroundColor: '#FFFFFF',
              paddingLeft: 10,
              marginBottom: 10,
            }}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
            }}
          >
            Beskrivning:
          </Text>
          <TextInput
            style={{
              borderRadius: ProjectTheme.borderRadius.large,
              height: 100,
              elevation: ProjectTheme.elevation.small,
              backgroundColor: '#FFFFFF',
              paddingLeft: 10,
              marginBottom: 10,
            }}
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline
            numberOfLines={4}
          />
          <Intervals
            selectedInterval={parseInt(interval, 10)}
            onIntervalChange={(value) => setInterval(value.toString())}
          />
          <Text></Text>
          <ChoresRating
            selectedRating={parseInt(rating, 10)}
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
            onPress={handleEditChore}
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
              width: '48%',
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
