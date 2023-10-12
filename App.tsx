import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Button, Card, DefaultTheme, PaperProvider } from "react-native-paper";
import { ProjectTheme } from "./theme/theme";

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: ProjectTheme.colors,
  };

  return (
    <PaperProvider theme={theme}>
      <View
        style={{
          ...ProjectTheme.containerStyle,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          style={{ marginBottom: 5 }}
          icon="camera"
          mode="contained"
          onPress={() => console.log("Button pressed")}
          labelStyle={{ color: ProjectTheme.colors.iconcolor }}
          rippleColor={ProjectTheme.colors.secondary}
        >
          Press Me
        </Button>
        <Card style={{ backgroundColor: ProjectTheme.colors.primary }}>
          <Card.Title title="Card Title" subtitle="Card Subtitle" />
          <Card.Content>
            <Text>Card content goes here.</Text>
          </Card.Content>
          <Card.Actions>
            <Button labelStyle={{ color: ProjectTheme.colors.textcolor }}>
              Cancel
            </Button>
            <Button labelStyle={{ color: ProjectTheme.colors.textcolor }}>
              OK
            </Button>
          </Card.Actions>
        </Card>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}
