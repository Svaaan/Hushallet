import { DefaultTheme } from 'react-native-paper';
export const ProjectTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FFFFFF',
    secondary: '#000000',
    iconcolor: '#000000',
    textcolor: '#333333',
    whiteTextColor: '#FFFFFF',
    background: '#F2F2F2',
    warningHighLightIcon: 'CD5D6F',
  },
  fonts: {
    regular: 'Roboto-Regular',
    bold: 'Roboto-Bold',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
  },
  typography: {
    header: {
      fontSize: 24,
      fontWeight: 'bold' as 'bold',
    },
    subheader: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    body: {
      fontSize: 16,
    },
    caption: {
      fontSize: 12,
    },
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
  },
  elevation: {
    small: 2,
    medium: 4,
    large: 8,
  },
  buttonPrimary: {
    backgroundColor: '#099E2C',
    color: '#FFFFFF',
  },
  buttonSecondary: {
    backgroundColor: '#FFFFFF',
    color: '#333333',
  },
  inputBackground: '#FFFFFF',
  inputPlaceholderColor: '#A0A0A0',
  alertSuccess: {
    backgroundColor: 'green',
    color: '#FFFFFF',
  },
  alertError: {
    backgroundColor: 'red',
    color: '#FFFFFF',
  },
  iconSize: 24,
  iconFamily: 'MaterialIcons',
  dividerColor: '#E0E0E0',
  headerBackgroundColor: '#FFFFFF',
  headerTitleColor: '#333333',
  navigationBackground: '#F2F2F2',
  modalBackground: 'rgba(0, 0, 0, 0.8)',
  listItemBackground: '#FFFFFF',
  listItemTextColor: '#333333',
};
