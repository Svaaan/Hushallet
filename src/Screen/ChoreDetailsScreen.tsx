import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { ChoreEvent, mockChoreEvents } from '../../data/mockedChoreEvents';
import { ProjectTheme } from '../../theme/theme';
import Intervals from '../Component/Interval';
import { useChoresContext } from '../Context/ChoressContext';
import { useProfileContext } from '../Context/ProfileContext';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'ChoreDetails'>;

const ChoreDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { profiles } = useProfileContext();
  const { getChoreById } = useChoresContext();
  const Chore = getChoreById(route.params.choreId);
  const [image, setImage] = useState<string | null>(Chore?.imageUri || null);

  useEffect(() => {
    if (Chore) {
      const imageUri = Chore.imageUri;
      setImage(imageUri ?? null);
    }
  }, [Chore]);

  const profileId: number | undefined = profiles[0]?.id;

  const handleCompleteChore = async () => {
    try {
      const newChoreEvent: ChoreEvent = {
        id: getNextChoreEventId(),
        profile_id: profileId,
        chore_id: Chore?.id,
        date: new Date(),
      };
      mockChoreEvents.push(newChoreEvent);
      console.log('ChoreEvent', newChoreEvent);

      navigation.navigate('Household');
      console.log('Navigated back to household');
    } catch (error) {
      console.log(error);
    }
  };

  const getNextChoreEventId = () => {
    const maxId = Math.max(...mockChoreEvents.map((event) => event.id), 0);
    return maxId + 1;
  };

  const handleEdit = (choreId: number) => {
    navigation.navigate('EditChore', { choreId });
  };

  const handleEditButtonPress = () => {
    if (Chore) {
      handleEdit(Chore.id);
    }
  };

  const nameStyle = {
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
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: ProjectTheme.colors.background,
      }}
    >
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 10, marginTop: 10 }}
      >
        {Chore ? (
          <View>
            <Text style={nameStyle}>{Chore.name}</Text>
            <Text
              style={{
                borderRadius: ProjectTheme.borderRadius.large,
                height: 100,
                elevation: ProjectTheme.elevation.small,
                backgroundColor: '#FFFFFF',
                paddingLeft: 10,
                marginBottom: 10,
                fontSize: 15,
                color: 'grey',
              }}
            >
              {Chore.description}
            </Text>
            <Intervals
              selectedInterval={Chore.interval}
              onIntervalChange={() => {}}
            />
            <View
              style={{
                borderRadius: ProjectTheme.borderRadius.large,
                height: 70,
                elevation: ProjectTheme.elevation.small,
                backgroundColor: '#FFFFFF',
                paddingLeft: 10,
                marginBottom: 5,
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Värde:</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: '#f2f2f2',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: ProjectTheme.colors.iconcolor,
                    }}
                  >
                    {Chore.chore_rating}
                  </Text>
                </View>
              </View>
            </View>
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: 380,
                  height: 225,
                  alignSelf: 'center',
                  marginBottom: 10,
                }}
              />
            )}
          </View>
        ) : (
          <Text>Loading Chore data...</Text>
        )}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {profiles[0].is_owner ? (
          <Button
            style={{
              marginBottom: 5,
              height: 50,
              width: '48%',
              justifyContent: 'center',
              backgroundColor: ProjectTheme.colors.primary,
            }}
            icon="archive-plus-outline"
            mode="contained"
            onPress={handleCompleteChore}
            labelStyle={{ color: ProjectTheme.colors.secondary }}
            rippleColor={ProjectTheme.colors.background}
          >
            Avklarat
          </Button>
        ) : (
          <Button
            style={{
              marginBottom: 5,
              height: 50,
              width: '85%',
              marginLeft: 30,
              backgroundColor: ProjectTheme.colors.primary,
            }}
            icon="archive-plus-outline"
            mode="contained"
            onPress={handleCompleteChore}
            labelStyle={{ color: ProjectTheme.colors.secondary }}
            rippleColor={ProjectTheme.colors.background}
          >
            Avklarat
          </Button>
        )}
        {profiles[0].is_owner && (
          <Button
            style={{
              elevation: ProjectTheme.elevation.large,
              marginBottom: 5,
              height: 50,
              width: '48%',
              justifyContent: 'center',
              backgroundColor: ProjectTheme.colors.primary,
            }}
            icon="archive-cog-outline"
            mode="contained"
            onPress={handleEditButtonPress}
            labelStyle={{ color: ProjectTheme.colors.secondary }}
            rippleColor={ProjectTheme.colors.background}
          >
            Redigera
          </Button>
        )}
      </View>
    </View>
  );
};

export default ChoreDetailsScreen;
