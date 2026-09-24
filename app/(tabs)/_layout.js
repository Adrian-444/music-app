import { Tabs } from "expo-router";
import { BottomNavigation, Icon } from "react-native-paper";

const ICONOS = { index: "home", buscar: "magnify" };

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: "#0D0D0D" } }}
            tabBar={({ state, descriptors, navigation, insets }) => (
                <BottomNavigation.Bar
                    navigationState={state}
                    safeAreaInsets={insets}
                    onTabPress={({ route }) => navigation.navigate(route.name)}
                    renderIcon={({ route, color }) => <Icon source={ICONOS[route.name]} size={24} color={color} />}
                    getLabelText={({ route }) => descriptors[route.key].options.title}
                />
            )}
        >
            <Tabs.Screen name="index" options={{ title: "Inicio" }} />
            <Tabs.Screen name="buscar" options={{ title: "Buscar" }} />
        </Tabs>
    );
}
