import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../Navigation/RootNavigator';
import { ProjectTheme } from '../../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'HouseProfile'>;

const placeholderStyle = {
  width: 300,
  height: 40,
  backgroundColor: ProjectTheme.inputBackground,
  borderRadius: ProjectTheme.borderRadius.medium,
  paddingLeft: 10,
  marginBottom: 20,
  color: ProjectTheme.colors.textcolor,
  elevation: ProjectTheme.elevation.small,
};

export default function ProfileScreen({ navigation }: Props) {
  return (
    <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: ProjectTheme.colors.background,
      paddingTop: 200,
    }}
  >
      <Text>Profile Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
