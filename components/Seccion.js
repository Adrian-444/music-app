import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export function Seccion({ titulo, verTodo }) {
    return (
        <View style={styles.container}>
            <Text variant="titleMedium" style={styles.titulo}>{titulo}</Text>
            {verTodo && (
                <Button compact textColor="#aaa" icon="chevron-right" contentStyle={styles.boton}>
                    Ver todo
                </Button>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 10,
    },
    titulo: {
        fontWeight: "bold",
    },
    boton: {
        flexDirection: "row-reverse",
    },
});
