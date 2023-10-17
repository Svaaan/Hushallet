import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';

import { ProjectTheme } from '../../theme/theme';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  useEffect(() => {
    console.log(navigation.getId());
    //kolla vad som ska vara i dependency listan, annars klagar es lint
  }, [navigation]);

  return (
    <View
      style={{
        ...ProjectTheme.containerStyle,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button
        style={{ marginBottom: 5 }}
        icon="camera"
        mode="contained"
        onPress={() => console.log('Button pressed')}
        labelStyle={{ color: ProjectTheme.colors.secondary }}
        rippleColor={ProjectTheme.colors.background}
      >
        Press Me
      </Button>
      <Card
        style={{
          backgroundColor: ProjectTheme.colors.secondary,
          elevation: ProjectTheme.elevation.large,
        }}
      >
        <Card.Title title="Card Title" subtitle="Card Subtitle" />
        <Card.Content>
          <Text>Card content goes here.</Text>
        </Card.Content>
        <Card.Actions>
          <Button labelStyle={{ color: ProjectTheme.colors.textcolor }}>
            Cancel
          </Button>
          <Button labelStyle={{ color: ProjectTheme.colors.whiteTextColor }}>
            OK
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
