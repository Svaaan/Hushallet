import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Task'>;

export default function TaskScreen({ navigation }: Props) {
  const [titel, setTitel] = React.useState('');
  return (
    <View style={{ backgroundColor: 'F2F2F2' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: 'FFFFFF',
        }}
      >
        <Text
          style={{
            fontSize: 30,
            paddingTop: 15,
            alignContent: 'center',
            height: 66,
            backgroundColor: 'FFFFFF',
          }}
        >
          Skapa en ny syssla
        </Text>
      </View>
      <View style={{ height: 66 }}></View>
      <TextInput
        label="Titel"
        value={titel}
        onChangeText={(text) => setTitel(text)}
      />
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
