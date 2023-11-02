import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native';
import { ProjectTheme } from '../../theme/theme';

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

const Button = ({ title, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        width: 200,
        height: 60,
        backgroundColor: ProjectTheme.buttonPrimary.color,
        elevation: ProjectTheme.elevation.medium,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 1,
      }}
      onPress={onPress}
    >
      <Text style={{ color: ProjectTheme.colors.textcolor }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
