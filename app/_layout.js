import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MD3DarkTheme, PaperProvider } from "react-native-paper";
import { PlaylistsProvider } from "../context/PlaylistsContext";

const tema = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: "#C6F432",
        onPrimary: "#000",
        background: "#0D0D0D",
        surface: "#1A1A1A",
        surfaceVariant: "#1F1F1F",
        secondaryContainer: "#C6F432",
        onSecondaryContainer: "#000",
    },
};

export default function RootLayout() {
    return (
        <PaperProvider theme={tema}>
            <PlaylistsProvider>
                <StatusBar style="light" />
                <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: tema.colors.background } }}>
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="player/[id]" options={{ presentation: "modal" }} />
                    <Stack.Screen name="playlist/[id]" />
                </Stack>
            </PlaylistsProvider>
        </PaperProvider>
    );
}
