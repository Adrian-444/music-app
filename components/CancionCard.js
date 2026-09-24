import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

export function CancionCard({ cancion, onPress }) {
    return (
        <Card style={styles.card} mode="contained" onPress={onPress}>
            <Card.Cover source={{ uri: cancion.imagen }} style={styles.imagen} />
            <Card.Content style={styles.contenido}>
                <Text variant="labelLarge" numberOfLines={1}>{cancion.titulo}</Text>
                <Text variant="labelSmall" style={styles.artista}>{cancion.artista}</Text>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 130,
        marginRight: 12,
        backgroundColor: "transparent",
    },
    imagen: {
        height: 130,
    },
    contenido: {
        paddingHorizontal: 0,
        borderLeftWidth: 3,
        borderLeftColor: "#C6F432",
        paddingLeft: 6,
        marginTop: 8,
    },
    artista: {
        color: "#999",
    },
});
