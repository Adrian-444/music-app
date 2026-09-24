import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Card, Chip, IconButton, List, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { CancionCard } from "../../components/CancionCard";
import { Seccion } from "../../components/Seccion";
import musica from "../../data/musica.json";

export default function Home() {
    const router = useRouter();
    const [categoria, setCategoria] = useState("Todas");

    const canciones = musica.canciones.filter(c => categoria === "Todas" || c.categoria === categoria);

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <ScrollView contentContainerStyle={styles.contenido}>
                <View style={styles.header}>
                    <Text variant="titleMedium">
                        Hola,{" "}
                        <Text variant="titleMedium" style={styles.negrita}>
                            {musica.usuario}
                        </Text>
                    </Text>
                    <View style={styles.fila}>
                        <IconButton icon="bell-outline" mode="contained" size={20} />
                        <IconButton icon="message-outline" mode="contained" size={20} />
                    </View>
                </View>

                <Seccion titulo="Categorías" />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {musica.categorias.map(cat => (
                        <Chip
                            key={cat}
                            style={styles.chip}
                            selected={categoria === cat}
                            showSelectedCheck={false}
                            onPress={() => setCategoria(cat)}
                        >
                            {cat}
                        </Chip>
                    ))}
                </ScrollView>

                <Seccion titulo="Canciones Populares" verTodo />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {canciones.map(c => (
                        <CancionCard key={c.id} cancion={c} onPress={() => router.push(`/player/${c.id}`)} />
                    ))}
                </ScrollView>

                <Seccion titulo="Nueva Colección" />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {musica.colecciones.map(col => (
                        <Card key={col.id} style={styles.coleccion}>
                            <View style={styles.fila}>
                                <Card.Content style={styles.coleccionTexto}>
                                    <Text variant="titleLarge" style={styles.coleccionTitulo}>
                                        {col.titulo}
                                    </Text>
                                    <Text variant="bodySmall" style={styles.gris}>
                                        {col.descripcion}
                                    </Text>
                                    <IconButton icon="arrow-right" iconColor="#000" style={styles.flecha} />
                                </Card.Content>
                                <Avatar.Image size={110} source={{ uri: col.imagen }} style={styles.coleccionImagen} />
                            </View>
                        </Card>
                    ))}
                </ScrollView>

                <Seccion titulo="Playlists" verTodo />
                {musica.playlists.map(p => (
                    <List.Item
                        key={p.id}
                        title={p.titulo}
                        description={`${p.canciones} canciones`}
                        left={() => <Avatar.Image size={48} source={{ uri: p.imagen }} />}
                        right={props => <List.Icon {...props} icon="play-circle-outline" />}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contenido: {
        padding: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    fila: {
        flexDirection: "row",
    },
    negrita: {
        fontWeight: "bold",
    },
    chip: {
        marginRight: 8,
        borderRadius: 20,
    },
    coleccion: {
        width: 290,
        marginRight: 12,
        backgroundColor: "#F2F2F2",
        overflow: "hidden",
    },
    coleccionTexto: {
        flex: 1,
        paddingVertical: 16,
    },
    coleccionTitulo: {
        color: "#000",
        fontWeight: "bold",
    },
    gris: {
        color: "#666",
    },
    flecha: {
        marginLeft: -8,
    },
    coleccionImagen: {
        alignSelf: "flex-end",
        marginRight: 8,
        marginBottom: 8,
    },
});
