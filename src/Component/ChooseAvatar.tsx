import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { ProjectTheme } from '../../theme/theme';

interface EmojiSelectionProps {
  selectedEmoji: string;
  onSelectEmoji: (emoji: string) => void;
}

const availableEmojis = [
  'https://i.imgur.com/FsJuOEK.png',  // fox
  'https://i.imgur.com/mqPUGcs.png',  // chicken
  'https://i.imgur.com/tpoiEFR.png',  // frog
  'https://i.imgur.com/vM8r642.png',  // octopus
  'https://i.imgur.com/vpITU1P.png',  // pig
  'https://i.imgur.com/pBldNOp.png',  // whale
];

export default function EmojiSelection({
  selectedEmoji,
  onSelectEmoji,
}: EmojiSelectionProps) {
  return (
    <View>
      {availableEmojis.map((emoji, index) => (
        <TouchableOpacity key={index} onPress={() => onSelectEmoji(emoji)}>
          <Image
            source={{ uri: emoji }}
            style={{
              paddingTop: 40,
              marginTop: 20,
              width: 40,
              height: 40,
              justifyContent: 'space-between',
              margin: 5,
              opacity: emoji === selectedEmoji ? 1 : 0.5,
            }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}
