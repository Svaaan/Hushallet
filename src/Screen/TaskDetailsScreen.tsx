import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { ChoreEvent, mockChoreEvents } from '../../data/mockedChoreEvents';
import { ProjectTheme } from '../../theme/theme';
import { useChoresContext } from '../Context/ChoressContext';
import { useProfileContext } from '../Context/ProfileContext';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetails'>;

const TaskDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { profiles } = useProfileContext();
  const { getChoreById } = useChoresContext();
  const Chore = getChoreById(route.params.choreId);

  const profileId: number | undefined = profiles[0]?.id;

  const handleCompleteTask = async () => {
    try {
      const newChoreEvent: ChoreEvent = {
        id: getNextChoreEventId(),
        // bör använda route.params.profilId
        profile_id: profileId,
        chore_id: Chore?.id || 0,
        date: new Date(),
      };
      mockChoreEvents.push(newChoreEvent);
      console.log('ChoreEvent', newChoreEvent);

      navigation.navigate('Household');
    } catch (error) {
      console.log(error);
    }
  };
  // Function to generate a unique ID for the new ChoreEvent
  const getNextChoreEventId = () => {
    // Find the maximum ID in the existing ChoreEvents
    const maxId = Math.max(...mockChoreEvents.map((event) => event.id), 0);
    // Increment the maximum ID to get the new ID
    return maxId + 1;
  };
  const handelRedigera = () => {
    navigation.navigate('EditTask');
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
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: ProjectTheme.colors.background,
        paddingTop: 20,
      }}
    >
      <ScrollView>
        {Chore ? (
          <View>
            <Text style={{ ...nameStyle, width: '100%' }}>ID: {Chore.id}</Text>
            <Text style={nameStyle}>Title: {Chore.name}</Text>
            <Text style={nameStyle}>Description: {Chore.description}</Text>
            <Text style={nameStyle}>Interval: {Chore.interval}</Text>
            <Text style={nameStyle}>Rating: {Chore.task_rating}</Text>
            {/* {Image && (
              <Image
                source={{ uri: Chore.imageUri }}
                style={{
                  width: 380,
                  height: 225,
                  alignSelf: 'center',
                  marginBottom: 10,
                }}
              />
            )} */}
          </View>
        ) : (
          <Text>Loading task data...</Text>
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
          icon="archive-plus-outline"
          mode="contained"
          onPress={handleCompleteTask}
          labelStyle={{ color: ProjectTheme.colors.secondary }}
          rippleColor={ProjectTheme.colors.background}
        >
          Avklarat
        </Button>
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
            onPress={handelRedigera}
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
export default TaskDetailsScreen;
