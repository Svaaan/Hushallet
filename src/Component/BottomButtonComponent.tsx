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
        width: 160,
        height: 40,
        marginBottom: 40,
        backgroundColor: ProjectTheme.buttonPrimary.color,
        borderRadius: ProjectTheme.borderRadius.medium,
        elevation: ProjectTheme.elevation.medium,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}
    >
      <Text style={{ color: ProjectTheme.colors.textcolor }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
